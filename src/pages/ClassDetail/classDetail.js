import { Button } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { CiBookmark, CiCalendarDate } from "react-icons/ci";
import { FaRegAddressBook } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoPricetagOutline } from "react-icons/io5";
import { RiVideoOnLine } from "react-icons/ri";

import { useContext, useEffect, useState } from "react";
import "./style.css";
import { AuthContext } from "../../context/auth";
import { useParams } from "react-router-dom";

function ClassDetail() {
  const { courses, setCourses, setNotifications } = useContext(AuthContext);

  const [userLogin, setUserLogin] = useState({});
  const [course, setCourse] = useState({});

  const { id } = useParams();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const courseFind = courses.find((item) => id == item.id);
    if (courseFind) setCourse(courseFind);
    if (user) {
      setUserLogin(JSON.parse(user));
    }
  }, [id, courses]);

  // Function to get status class name
  const getStatusClassName = (status) => {
    switch (status) {
      case "Chưa giao":
        return "chua-giao";
      case "Đang giao":
        return "dang-giao";
      case "Đang duyệt":
        return "dang-duyet";
      case "Đã hoàn thành":
        return "da-hoan-thanh";
      default:
        return "chua-giao";
    }
  };

  const handleClick = () => {
    const currentDate = new Date();

    // Định dạng ngày theo kiểu dd/mm/yyyy
    const day = String(currentDate.getDate()).padStart(2, "0"); // Thêm số 0 vào ngày nếu ngày nhỏ hơn 10
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Thêm số 0 vào tháng nếu tháng nhỏ hơn 10
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const notificationToUser = {
      from: userLogin?.id,
      to: course?.account,
      content: `Bạn đã nhận một thông báo từ gia sư ${userLogin?.firstName} ${userLogin?.lastName}`,
      createDate: formattedDate,
      read: false,

    };

    const notificationToTutor = {
      from: 0,
      to: userLogin?.id,
      content: `Bạn đã đăng ký nhận lớp dạy và đang đợi duyệt`,
      createDate: formattedDate,
      read: false,

    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notificationToUser,
      notificationToTutor,
    ]);

    const updatedCourses = courses.map((item) =>
      item.id === course.id
        ? { ...item, status: "Đang giao" }
        : item
    );

    setCourses(updatedCourses);
  };

  return (
    <Container>
      <div className="class-detail--wrap">
        <Row>
          <Col md={8}>
            <div className="class-detail--left">
              <div className="class-detail--img">
                <img
                  src="/assets/images/anh-gai-xinh-lop-10-01.webp"
                  alt="avatar"
                />
              </div>

              <div style={{ margin: "20px 0" }}>
                <h1>Yêu cầu</h1>
                <p>{course.requirements}</p>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="class-detail--right">
              <div
                className={`status-ribbon ${getStatusClassName(course.status)}`}
              >
                {course.status}
              </div>
              <div className="class-detail--price">
                <span>Giá</span>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IoPricetagOutline style={{ fontSize: "20px" }} />
                  <p style={{ margin: 0 }}>
                    <span style={{ fontSize: 30 }}>
                      <strong>300.000</strong>{" "}
                    </span>
                    vnđ/buổi
                  </p>
                </div>
              </div>

              <div className="class-detail--block">
                <div className="class-detail--icon">
                  <CiBookmark style={{ fontSize: 20 }} />
                  <span>Môn học: </span>
                </div>

                <div>{course.subject}</div>
              </div>
              <div className="class-detail--block">
                <div className="class-detail--icon">
                  <IoMdTime style={{ fontSize: 20 }} />
                  <span>Thời lượng: </span>
                </div>

                <div>{course.time}</div>
              </div>
              <div className="class-detail--block">
                <div className="class-detail--icon">
                  <RiVideoOnLine style={{ fontSize: 20 }} />
                  <span>Hình thức: </span>
                </div>

                <div>{course.type}</div>
              </div>
              <div className="class-detail--block">
                <div className="class-detail--icon">
                  <FaRegAddressBook style={{ fontSize: 20 }} />
                  <span>Địa chỉ: </span>
                </div>

                <div>{course.address}</div>
              </div>

              <div className="class-detail--block">
                <div className="class-detail--icon">
                  <CiCalendarDate style={{ fontSize: 20 }} />
                  <span>Thời gian tạo: </span>
                </div>
                <div>{course.dateCreated}</div>
              </div>

              {userLogin?.role === "tutor" && course.status === "Chưa giao" ? (
                <div>
                  <Button type="primary" onClick={handleClick}>
                    Nhận lớp
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ClassDetail;
