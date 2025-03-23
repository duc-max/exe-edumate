import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

const Register = () => {
  const { accounts } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
    province: "",
    district: "",
    ward: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // State cho dữ liệu địa chỉ từ API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Dữ liệu cho dropdown role
  const roles = [
    { value: "", label: "-- Chọn vai trò --" },
    { value: "user", label: "Học sinh/phụ huynh" },
    { value: "tutor", label: "Gia sư" },
  ];

  // Dữ liệu cho dropdown gender
  const genders = [
    { value: "", label: "-- Chọn giới tính --" },
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  // Fetch dữ liệu tỉnh/thành phố khi component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        // Format dữ liệu cho dropdown
        const formattedProvinces = [
          { value: "", label: "-- Chọn Tỉnh/Thành phố --" },
          ...data.map((province) => ({
            value: province.code,
            label: province.name,
          })),
        ];

        setProvinces(formattedProvinces);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu tỉnh/thành phố:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch dữ liệu quận/huyện khi tỉnh/thành phố thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.province) {
        setDistricts([{ value: "", label: "-- Chọn Quận/Huyện --" }]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://provinces.open-api.vn/api/p/${formData.province}?depth=2`
        );
        const data = await response.json();

        // Format dữ liệu cho dropdown
        const formattedDistricts = [
          { value: "", label: "-- Chọn Quận/Huyện --" },
          ...data.districts.map((district) => ({
            value: district.code,
            label: district.name,
          })),
        ];

        setDistricts(formattedDistricts);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu quận/huyện:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [formData.province]);

  useEffect(() => {
    const fetchWards = async () => {
      if (!formData.district) {
        setWards([{ value: "", label: "-- Chọn Phường/Xã --" }]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://provinces.open-api.vn/api/d/${formData.district}?depth=2`
        );
        const data = await response.json();

        // Format dữ liệu cho dropdown
        const formattedWards = [
          { value: "", label: "-- Chọn Phường/Xã --" },
          ...data.wards.map((ward) => ({
            value: ward.code,
            label: ward.name,
          })),
        ];

        setWards(formattedWards);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phường/xã:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWards();
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Reset các field phụ thuộc khi thay đổi tỉnh/thành phố
    if (name === "province") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        district: "",
        ward: "",
      }));
    }

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ward: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.birthday) {
      newErrors.birthday = "Ngày sinh không được để trống";
    } else {
      // Kiểm tra tuổi (ví dụ: phải từ 10 tuổi trở lên)
      const birthDate = new Date(formData.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 10) {
        newErrors.birthday = "Bạn phải đủ 10 tuổi trở lên";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!formData.role) {
      newErrors.role = "Vui lòng chọn vai trò";
    }

    if (!formData.province) {
      newErrors.province = "Vui lòng chọn Tỉnh/Thành phố";
    }

    if (formData.province && !formData.district) {
      newErrors.district = "Vui lòng chọn Quận/Huyện";
    }

    if (formData.district && !formData.ward) {
      newErrors.ward = "Vui lòng chọn Phường/Xã";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản và điều kiện";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);

      const provinceLabel =
        provinces.find((p) => p.value == formData.province)?.label || "";
      const districtLabel =
        districts.find((d) => d.value == formData.district)?.label || "";
      const wardLabel =
        wards.find((w) => w.value == formData.ward)?.label || "";
      const genderLabel =
        genders.find((g) => g.value === formData.gender)?.value || "";

      const registerInfo = {
        id: accounts.length + 1,
        firstName: formData.fullName.split(" ")[0],
        lastName: formData.fullName.split(" ").slice(1).join(" "),
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthday: formData.birthday,
        gender: genderLabel,
        address: `${provinceLabel}, ${districtLabel},  ${wardLabel}`,
        role: formData.role,
      };

      const currentAccounts =
        JSON.parse(localStorage.getItem("accounts")) || [];
      currentAccounts.push(registerInfo);
      localStorage.setItem("accounts", JSON.stringify(currentAccounts));

      setTimeout(() => {
        window.location.href = "dang-nhap";
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  // Format địa chỉ đầy đủ
  const getFullAddress = () => {
    const provinceLabel =
      provinces.find((p) => p.value == formData.province)?.label || "";
    const districtLabel =
      districts.find((d) => d.value == formData.district)?.label || "";
    const wardLabel = wards.find((w) => w.value == formData.ward)?.label || "";

    return wardLabel && districtLabel && provinceLabel
      ? `${wardLabel}, ${districtLabel}, ${provinceLabel}`
      : "";
  };

  // Format giới tính hiển thị
  const getGenderLabel = () => {
    return genders.find((g) => g.value === formData.gender)?.label || "";
  };

  // Format ngày sinh để hiển thị
  const formatBirthday = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="form-container">
      <div className="form-box">
        {isSubmitted ? (
          <div className="success-message">
            <h2>Đăng Ký Thành Công!</h2>
            <p>Cảm ơn bạn đã đăng ký, {formData.fullName}.</p>
            <p>Chúng tôi sẽ liên hệ với bạn qua email: {formData.email}</p>
            <p>Ngày sinh: {formatBirthday(formData.birthday)}</p>
            <p>Giới tính: {getGenderLabel()}</p>
            {getFullAddress() && <p>Địa chỉ: {getFullAddress()}</p>}
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn btn-primary"
            >
              Đăng ký mới
            </button>
          </div>
        ) : (
          <>
            <h2 className="form-title">Đăng Ký Tài Khoản</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên</label>
                <input
                  className={errors.fullName ? "input-error" : ""}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <p className="error-message">{errors.fullName}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birthday">Ngày sinh</label>
                  <input
                    className={errors.birthday ? "input-error" : ""}
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                  {errors.birthday && (
                    <p className="error-message">{errors.birthday}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Giới tính</label>
                  <select
                    className={errors.gender ? "input-error" : ""}
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    {genders.map((gender) => (
                      <option key={gender.value} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p className="error-message">{errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className={errors.email ? "input-error" : ""}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    className={errors.password ? "input-error" : ""}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                  <input
                    className={errors.confirmPassword ? "input-error" : ""}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    className={errors.phone ? "input-error" : ""}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="error-message">{errors.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="role">Vai trò</label>
                  <select
                    className={errors.role ? "input-error" : ""}
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="error-message">{errors.role}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <div className="address-selects">
                  <div className="select-container">
                    <select
                      className={errors.province ? "input-error" : ""}
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      disabled={loading || provinces.length <= 1}
                    >
                      {provinces.map((province) => (
                        <option key={province.value} value={province.value}>
                          {province.label}
                        </option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="error-message">{errors.province}</p>
                    )}
                  </div>

                  <div className="select-container">
                    <select
                      className={errors.district ? "input-error" : ""}
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      disabled={
                        loading || !formData.province || districts.length <= 1
                      }
                    >
                      {districts.map((district) => (
                        <option key={district.value} value={district.value}>
                          {district.label}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="error-message">{errors.district}</p>
                    )}
                  </div>

                  <div className="select-container">
                    <select
                      className={errors.ward ? "input-error" : ""}
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      disabled={
                        loading || !formData.district || wards.length <= 1
                      }
                    >
                      {wards.map((ward) => (
                        <option key={ward.value} value={ward.value}>
                          {ward.label}
                        </option>
                      ))}
                    </select>
                    {errors.ward && (
                      <p className="error-message">{errors.ward}</p>
                    )}
                  </div>
                </div>
                {loading && <p className="info-message">Đang tải dữ liệu...</p>}
              </div>

              <div className="form-group checkbox-group">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label htmlFor="agreeTerms">
                    Tôi đồng ý với{" "}
                    <Link className="link">điều khoản và điều kiện</Link>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="error-message">{errors.agreeTerms}</p>
                )}
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng Ký"}
                </button>
              </div>

              <div className="login-link">
                <p>
                  Đã có tài khoản?{" "}
                  <Link to="/login" className="link">
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
