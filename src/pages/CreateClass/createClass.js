// CreateClass.jsx
import React, { useState, useContext, useEffect } from "react";

import "./style.css";
import { AuthContext } from "../../context/auth";
import { Container } from "react-bootstrap";

const CreateClass = () => {
  const { courses, setCourses } = useContext(AuthContext);


 const [userLogin, setUserLogin] = useState({});
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      setUserLogin(JSON.parse(user));
    }
  }, [user]);

  const [formData, setFormData] = useState({
    id: "",
    status: "Chưa giao",
    subject: "",
    code: "",
    grade: "",
    type: "Offline",
    time: "",
    dateCreated:
      new Date().toLocaleDateString("vi-VN") +
      " " +
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    requirements: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();



    const newCourse = {
      ...formData,
      id: courses.length + 1,
      account: userLogin.id,
    };

    addCourse(newCourse);

    setFormData({
      id: 0,
      status: "Chưa giao",
      subject: "",
      code: "",
      grade: "",
      type: "Offline",
      time: "",
      dateCreated:
        new Date().toLocaleDateString("vi-VN") +
        " " +
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      requirements: "",
      address: "",
    });

    alert("Lớp học đã được tạo thành công!");
  };

  return (
    <Container>
      <div className="create-class-container">
        <h2>Tạo lớp học mới</h2>

        <form className="create-class-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Môn học</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="code">Mã lớp</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="grade">Lớp</label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Hình thức</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="time">Thời gian</label>
              <input
                type="text"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Ví dụ: 1 buổi/tuần"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="status">Trạng thái</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Chưa giao">Chưa giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đang dạy">Đang dạy</option>
                <option value="Đã hoàn thành">Đã hoàn thành</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="requirements">Yêu cầu chi tiết</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Nhập các yêu cầu chi tiết cho lớp học này. Ví dụ: DT989 Toán 9/... Yêu cầu giáo viên có kinh nghiệm dạy học sinh lớp 9 chuẩn bị cho kỳ thi vào lớp 10. Cần tập trung vào các dạng bài tập nâng cao, đặc biệt là hình học và đại số. Học sinh hiện đang ở mức trung bình khá và cần được nâng cao điểm số để đạt 8.5 trở lên trong kỳ thi sắp tới. Lịch học linh hoạt vào buổi tối các ngày trong tuần hoặc sáng cuối tuần. Gia đình mong muốn tìm giáo viên có phương pháp giảng dạy dễ hiểu và kiên nhẫn."
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-create">
              Tạo lớp học
            </button>
            <button type="button" className="btn-cancel">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateClass;
