import React, { useState, useEffect } from "react";
import "./style.css";

const UserInfo = () => {
  // State để lưu thông tin user từ localStorage
  const [user, setUser] = useState(null);
  const [isTutor, setIsTutor] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // States for user information
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
  });

  // States for password
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // States for experiences
  const [experiences, setExperiences] = useState([]);

  // States for education
  const [education, setEducation] = useState([]);

  // States for ID card
  const [frontIdCard, setFrontIdCard] = useState(null);
  const [backIdCard, setBackIdCard] = useState(null);
  const [frontIdPreview, setFrontIdPreview] = useState(null);
  const [backIdPreview, setBackIdPreview] = useState(null);

  // States for active tab
  const [activeTab, setActiveTab] = useState("personal");

  // Lấy thông tin user từ localStorage khi component được mount
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      setUser(parsedUser);

      // Kiểm tra role
      setIsTutor(parsedUser.role === "tutor");

      // Thiết lập thông tin cá nhân từ dữ liệu user
      setPersonalInfo({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        birthDate: parsedUser.birthDate || "",
        address: parsedUser.address || "",
      });

      // Kiểm tra trạng thái xác thực
      // User được xác thực khi có ít nhất 1 kinh nghiệm, 1 bằng cấp và có hình CMND
      const hasExperience =
        parsedUser.experiences && parsedUser.experiences.length > 0;
      const hasEducation =
        parsedUser.education && parsedUser.education.length > 0;
      const hasIdCards = parsedUser.frontIdCard && parsedUser.backIdCard;

      setIsVerified(hasExperience && hasEducation && hasIdCards);

      // Nếu có dữ liệu, thiết lập các state tương ứng
      if (parsedUser.experiences) setExperiences(parsedUser.experiences);
      if (parsedUser.education) setEducation(parsedUser.education);
      if (parsedUser.avatarUrl) setAvatarPreview(parsedUser.avatarUrl);
      if (parsedUser.frontIdCard) setFrontIdPreview(parsedUser.frontIdCard);
      if (parsedUser.backIdCard) setBackIdPreview(parsedUser.backIdCard);
    } else {
      // Nếu chưa có user, khởi tạo một số dữ liệu mẫu
      setExperiences([
        {
          id: 1,
          company: "Công ty ABC",
          position: "Nhân viên IT",
          startDate: "2020-01",
          endDate: "2022-12",
          description: "Phát triển và bảo trì hệ thống web.",
        },
      ]);

      setEducation([
        {
          id: 1,
          school: "Đại học Bách Khoa",
          degree: "Cử nhân CNTT",
          startDate: "2015-09",
          endDate: "2019-06",
          description: "Chuyên ngành Công nghệ phần mềm.",
        },
      ]);
    }
  }, []);

  // Handle file upload for avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for ID card
  const handleIdCardChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      if (side === "front") {
        setFrontIdCard(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFrontIdPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setBackIdCard(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBackIdPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle personal info change
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle experience change
  const handleExperienceChange = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  // Handle education change
  const handleEducationChange = (id, field, value) => {
    setEducation((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  // Add new experience
  const addExperience = () => {
    const newId =
      experiences.length > 0
        ? Math.max(...experiences.map((exp) => exp.id)) + 1
        : 1;
    setExperiences((prev) => [
      ...prev,
      {
        id: newId,
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  // Add new education
  const addEducation = () => {
    const newId =
      education.length > 0
        ? Math.max(...education.map((edu) => edu.id)) + 1
        : 1;
    setEducation((prev) => [
      ...prev,
      {
        id: newId,
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  // Remove experience
  const removeExperience = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Remove education
  const removeEducation = (id) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  // Check verification status after updating data
  useEffect(() => {
    const hasExperience = experiences.length > 0;
    const hasEducation = education.length > 0;
    const hasIdCards = frontIdPreview && backIdPreview;

    setIsVerified(hasExperience && hasEducation && hasIdCards);
  }, [experiences, education, frontIdPreview, backIdPreview]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create updated user object
    const updatedUser = {
      ...user,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      email: personalInfo.email,
      phone: personalInfo.phone,
      birthDate: personalInfo.birthDate,
      address: personalInfo.address,
      experiences: experiences,
      education: education,
      avatarUrl: avatarPreview,
      frontIdCard: frontIdPreview,
      backIdCard: backIdPreview,
      role: user ? user.role : "student", // Keep the role unchanged
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Check verification status
    const hasExperience = experiences.length > 0;
    const hasEducation = education.length > 0;
    const hasIdCards = frontIdPreview && backIdPreview;
    const newVerificationStatus = hasExperience && hasEducation && hasIdCards;

    setIsVerified(newVerificationStatus);

    // Show success message
    alert("Thông tin đã được cập nhật thành công!");
  };

  return (
    <div className="profile-container">
      <h1>Thông tin cá nhân</h1>

      {/* Cảnh báo xác thực */}
      {!isVerified && (
        <div className="verification-alert">
          <i className="alert-icon">⚠️</i>
          <div className="alert-content">
            <h3>Tài khoản chưa được xác thực</h3>
            <p>
              Vui lòng cập nhật đầy đủ thông tin về kinh nghiệm, bằng cấp và tải
              lên ảnh CMND/CCCD để tài khoản được xác thực.
            </p>
          </div>
        </div>
      )}

      <div className="profile-tabs">
        <button
          className={activeTab === "personal" ? "active" : ""}
          onClick={() => setActiveTab("personal")}
        >
          Thông tin cơ bản
        </button>
        <button
          className={activeTab === "password" ? "active" : ""}
          onClick={() => setActiveTab("password")}
        >
          Đổi mật khẩu
        </button>
        {/* Chỉ hiển thị tab kinh nghiệm và học vấn cho tutor */}
        {isTutor && (
          <>
            <button
              className={activeTab === "experience" ? "active" : ""}
              onClick={() => setActiveTab("experience")}
            >
              Kinh nghiệm
            </button>
            <button
              className={activeTab === "education" ? "active" : ""}
              onClick={() => setActiveTab("education")}
            >
              Học vấn
            </button>
          </>
        )}
        <button
          className={activeTab === "documents" ? "active" : ""}
          onClick={() => setActiveTab("documents")}
        >
          Giấy tờ
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div
          className={`tab-content ${activeTab === "personal" ? "active" : ""}`}
        >
          <h2>Thông tin cơ bản</h2>

          <div className="avatar-upload">
            <div className="avatar-preview">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" />
              ) : (
                <div className="avatar-placeholder">
                  <span>
                    {personalInfo.firstName.charAt(0)}
                    {personalInfo.lastName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar">Chọn ảnh đại diện</label>
          </div>

          <div className="form-group">
            <label htmlFor="firstName">Tên</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Họ</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Ngày sinh</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={personalInfo.birthDate}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ</label>
            <textarea
              id="address"
              name="address"
              value={personalInfo.address}
              onChange={handlePersonalInfoChange}
              required
            />
          </div>
        </div>

        {/* Password Change */}
        <div
          className={`tab-content ${activeTab === "password" ? "active" : ""}`}
        >
          <h2>Đổi mật khẩu</h2>

          <div className="form-group">
            <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordInfo.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Mật khẩu mới</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordInfo.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordInfo.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {passwordInfo.newPassword !== passwordInfo.confirmPassword && (
            <p className="error-message">Mật khẩu xác nhận không khớp</p>
          )}
        </div>

        {/* Experience - Only visible for tutor */}
        {isTutor && (
          <div
            className={`tab-content ${
              activeTab === "experience" ? "active" : ""
            }`}
          >
            <h2>Kinh nghiệm làm việc</h2>

            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-item">
                <h3>Kinh nghiệm {index + 1}</h3>

                <div className="form-group">
                  <label>Công ty</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "company", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Vị trí</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "position", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Từ tháng</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Đến tháng</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeExperience(exp.id)}
                >
                  Xóa
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-button"
              onClick={addExperience}
            >
              + Thêm kinh nghiệm
            </button>
          </div>
        )}

        {/* Education - Only visible for tutor */}
        {isTutor && (
          <div
            className={`tab-content ${
              activeTab === "education" ? "active" : ""
            }`}
          >
            <h2>Học vấn</h2>

            {education.map((edu, index) => (
              <div key={edu.id} className="education-item">
                <h3>Học vấn {index + 1}</h3>

                <div className="form-group">
                  <label>Trường</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "school", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Bằng cấp</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "degree", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Từ tháng</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleEducationChange(
                          edu.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Đến tháng</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleEducationChange(edu.id, "endDate", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleEducationChange(
                        edu.id,
                        "description",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeEducation(edu.id)}
                >
                  Xóa
                </button>
              </div>
            ))}

            <button type="button" className="add-button" onClick={addEducation}>
              + Thêm học vấn
            </button>
          </div>
        )}

        {/* Documents */}
        <div
          className={`tab-content ${activeTab === "documents" ? "active" : ""}`}
        >
          <h2>Giấy tờ</h2>

          <div className="id-card-upload">
            <h3>CMND/CCCD</h3>

            <div className="id-card-row">
              <div className="id-card-item">
                <h4>Mặt trước</h4>
                <div className="id-card-preview">
                  {frontIdPreview ? (
                    <img src={frontIdPreview} alt="Front ID Preview" />
                  ) : (
                    <div className="id-card-placeholder">
                      <span>Mặt trước</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="frontId"
                  accept="image/*"
                  onChange={(e) => handleIdCardChange(e, "front")}
                />
                <label htmlFor="frontId">Chọn ảnh</label>
              </div>

              <div className="id-card-item">
                <h4>Mặt sau</h4>
                <div className="id-card-preview">
                  {backIdPreview ? (
                    <img src={backIdPreview} alt="Back ID Preview" />
                  ) : (
                    <div className="id-card-placeholder">
                      <span>Mặt sau</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="backId"
                  accept="image/*"
                  onChange={(e) => handleIdCardChange(e, "back")}
                />
                <label htmlFor="backId">Chọn ảnh</label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit">
          <button type="submit" className="submit-button">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
