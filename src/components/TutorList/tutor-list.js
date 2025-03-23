import { Col, Row } from "react-bootstrap";
import { Pagination } from "antd";

import "./style.css";
import Card from "../Card/card";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
function TutorList() {
  const { tutors } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 12;

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Row>
        {currentTutors.map((tutor, index) => {
          return (
            <Col md={3} key={index}>
              <Card tutor={tutor} />
            </Col>
          );
        })}
      </Row>

      <div className="tutor-pagination">
        <Pagination
          current={currentPage}
          total={tutors.length}
          pageSize={tutorsPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default TutorList;
