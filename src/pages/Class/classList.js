import { Col, Container, Row } from "react-bootstrap";
import { Pagination } from "antd";

import "./style.css";
import CourseCard from "../../components/Course/_element/courseCard";
import { useContext, useState } from "react";
import FilterBarWithStyles from "../../components/FilterBar";
import { AuthContext } from "../../context/auth";

function ClassList() {
  const { courses } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 16;
  const totalCourses = courses.length;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <div className="class-list--wrap">
        <FilterBarWithStyles />
        <Row>
          {currentCourses.map((course, index) => {
            return (
              <Col key={index} md={3} style={{ marginBottom: "20px" }}>
                <CourseCard course={course} />
              </Col>
            );
          })}
        </Row>

        <div style={{ margin: "100px 0" }}>
          <Pagination
            align="center"
            current={currentPage}
            onChange={handlePageChange}
            defaultPageSize={coursesPerPage}
            total={totalCourses}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </div>
      </div>
    </Container>
  );
}

export default ClassList;
