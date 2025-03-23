import { FloatButton } from "antd";
import { Col, Container, Row } from "react-bootstrap";
import { IoChatboxOutline } from "react-icons/io5";

import Banner from "../../components/Banner/banner";
import CourseCarousel from "../../components/Course/courseList";
import Filter from "../../components/Filter/filter";
import MapComponent from "../../components/Map/map";
import NavHome from "../../components/NavHome/nav-home";
import TutorList from "../../components/TutorList/tutor-list";
import "./style.css";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    // Tạo và khởi tạo chatbox sau khi component được render
    const script = document.createElement("script");
    script.src = "https://app.tudongchat.com/js/chatbox.js";
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line no-undef
      const tudong_chatbox = new TuDongChat("Jwh9SNOsRShG4CqsS4OPE");
      tudong_chatbox.initial();
    };
    document.body.appendChild(script);

    // Dọn dẹp khi component bị unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Banner />

      <div style={{ marginTop: "50px" }}>
        <CourseCarousel />
      </div>

      <div className="home-tutor--wrapper">
        <Container>
          <div style={{ paddingTop: "50px" }}>
            <h1>Danh sách gia sư</h1>
            <NavHome />

            <div className="home-tutor--list">
              <Row>
                <Col md={2}>
                  <Filter />
                </Col>
                <Col md={10}>
                  <TutorList />
                </Col>
              </Row>
            </div>
          </div>

          <div style={{ width: "100%", height: "500px" }}>
            <MapComponent />
          </div>

          {/* <FloatButton
            className="float-button-pulse"
            shape="circle"
            type="primary"
            style={{ insetInlineEnd: 60, width: 60, height: 60 }}
            icon={<IoChatboxOutline style={{ fontSize: 22 }} />}
            onClick={loadChatboxScript}  // Trigger the chatbox script loading
          /> */}
        </Container>
      </div>
    </div>
  );
}

export default Home;
