import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import CourseCard from "./_element/courseCard";
import "./style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import config from "../../configs/index";
import { AuthContext } from "../../context/auth";

function CourseList() {
  const { courses } = useContext(AuthContext);

  const settings = {
    dots: true, // Hiển thị dot navigation
    infinite: true, // Lặp lại slide vô hạn
    speed: 500, // Thời gian chuyển slide
    slidesToShow: 4, // Số lượng slide hiển thị mỗi lần
    slidesToScroll: 1, // Số lượng slide cuộn mỗi lần
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 2000, // Tốc độ tự động chuyển slide (3 giây)
  };

  return (
    <Container>
      <div style={{ padding: "20px" }}>
        <Slider {...settings} arrows>
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </Slider>
        <div className="view-all-container">
          <Link to={config.router.classList} className="view-all-button">
            Xem tất cả
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default CourseList;
