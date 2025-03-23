import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Chưa giao":
        return "#fff2cc"; // Màu vàng nhạt
      case "Đang giao":
        return "#cce5ff"; // Màu xanh nhạt
      case "Đang duyệt":
        return "#d4edda"; // Màu xanh lá nhạt
      case "Đã hoàn thành":
        return "#d6d8db"; // Màu xám nhạt
      default:
        return "#fff2cc"; // Màu mặc định nếu không xác định được trạng thái
    }
  };

  return (
    <div className="course-card">
      <div className="card-header">
        <div
          className="status-badge"
          style={{ backgroundColor: getStatusColor(course.status) }}
        >
          {course.status}
        </div>
        <div className="course-info">
          <div className="subject">Môn: {course.subject}</div>
          <div className="agreement">Thỏa thuận</div>
          <div className="code">Mã số: {course.code}</div>
        </div>
      </div>

      <div className="card-body">
        <div className="detail-row">
          <div className="detail-label">LỚP</div>
          <div className="detail-value">{course.grade}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Hình thức học:</div>
          <div className="detail-value">{course.type}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Thời gian:</div>
          <div className="detail-value">{course.time}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Ngày tạo:</div>
          <div className="detail-value">{course.dateCreated}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Yêu cầu khác:</div>
          <div className="detail-value truncate">{course.requirements}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Địa chỉ:</div>
          <div className="detail-value">{course.address}</div>
        </div>
      </div>

      <div className="card-footer">
        <Link to={`/lop-hoc/${course.id}`} className="view-button">
          Xem chi tiết
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
