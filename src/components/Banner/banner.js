import { Col, Container, Row } from "react-bootstrap";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiWatch } from "react-icons/fi";
import { PiPhoneCall } from "react-icons/pi";
import "./style.css";

function Banner() {
  return (
    <div className="banner">
      <Container>
        <Row>
          <Col md={6}>
            <div className="banner-content">
              <div>
                <h5 className="banner-subSlogan">
                  Kết Nối Kiến Thức, Xây Dựng Tương Lai
                </h5>
              </div>

              <h1 className="banner-slogan">
                Chọn <span style={{ color: "#f37739" }}>Gia Sư</span>, Khai Phá{" "}
                <span style={{ color: "#066ccb" }}>Tiềm Năng</span>
              </h1>
              <p>
                Chào mừng đến với EduMate, nơi học tập không có giới hạn. Cho dù
                bạn là sinh viên, chuyên gia hay người học suốt đời...
              </p>

              <div className="banner-btn-link">
                <Link className="banner-btn banner-btn--left ">
                  Gia sư
                  <FiArrowUpRight
                    style={{ fontSize: "20px", marginLeft: "5px" }}
                  />
                </Link>
                <Link className="banner-btn banner-btn--right">
                  Về chúng tôi
                  <FiArrowUpRight
                    style={{ fontSize: "20px", marginLeft: "5px" }}
                  />
                </Link>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="banner-thumb">
              <img
                src="./assets/images/Hinh-gai-xinh-2009-toc-dai-cute.jpg"
                alt=""
                className="banner-thumb-img"
              />

              <div className="banner-box banner-box--one">
                <span style={{ color: "#066ccb" }}>20</span> gia sư chất lượng
                <div className="enrolled-tutor">
                  <img
                    src="https://eduallwp.wowtheme7.com/wp-content/uploads/2025/01/enroll-student-img1.png"
                    alt="tutor"
                    className="tutor-img"
                  />
                  <img
                    src="https://eduallwp.wowtheme7.com/wp-content/uploads/2025/01/enroll-student-img3.png"
                    alt="tutor"
                    className="tutor-img"
                  />
                  <img
                    src="https://eduallwp.wowtheme7.com/wp-content/uploads/2025/01/enroll-student-img2.png"
                    alt="tutor"
                    className="tutor-img"
                  />
                  <img
                    src="https://eduallwp.wowtheme7.com/wp-content/uploads/2025/01/enroll-student-img4.png"
                    alt="tutor"
                    className="tutor-img"
                  />
                  <img
                    src="https://eduallwp.wowtheme7.com/wp-content/uploads/2025/01/enroll-student-img5.png"
                    alt="tutor"
                    className="tutor-img"
                  />
                  <img
                    src="https://eduallwp.wowtheme7.com/wp-content/uploads/2025/01/enroll-student-img6.png"
                    alt="tutor"
                    className="tutor-img"
                  />
                </div>
              </div>

              <div className="banner-box banner-box--two">
                <span className="box-two--icon">
                  <FiWatch style={{fontSize: "26px", color: "#fff"}}/>
                </span>
                <div className="banner-discount">
                    <span><strong>Giảm 20%</strong></span>
                    <span>Cho tất cả gia sư</span>

                </div>
              </div>

              <div className="banner-box banner-box--three">
                <span className="box-three--icon">
                  <PiPhoneCall style={{fontSize: "26px", color: "#066ccb"}}/>
                </span>
                <div className="banner-phone">
                    <span>Liên hệ</span>
                    <span style={{color: "#066ccb"}}>0123456789</span>

                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Banner;
