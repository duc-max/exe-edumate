import React, { useState } from "react";
import { Table, Button, Tag, Space, Modal } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./style.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// Dữ liệu lớp học giả lập
const classList = [
  {
    id: 1,
    status: "Chưa giao",
    subject: "Toán",
    code: "ST495",
    grade: "9",
    type: "Offline",
    time: "1 buổi/tuần",
    dateCreated: "12/04/2023 10:04",
    requirements: "DT989 Toán 9/...",
    address: "Hà Nội",
    account: 3,
    tutors: [
      { id: 1, name: "Nguyễn Văn A", status: "Pending" },
      { id: 2, name: "Trần Thị B", status: "Pending" },
    ],
  },
  {
    id: 2,
    status: "Chưa giao",
    subject: "Lý",
    code: "ST496",
    grade: "10",
    type: "Offline",
    time: "2 buổi/tuần",
    dateCreated: "13/04/2023 11:04",
    requirements: "DT990 Lý 10/...",
    address: "Hà Nội",
    account: 2,
    tutors: [{ id: 3, name: "Phan Minh C", status: "Pending" }],
  },
];

function ClassListByUser() {
  const userId = 3;

  const filteredClasses = classList.filter(
    (classItem) => classItem.account === userId
  );

  const [visible, setVisible] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const handleAccept = (tutorId) => {
    console.log("Đồng ý gia sư ID:", tutorId);
    setVisible(false);
  };

  const handleReject = (tutorId) => {
    console.log("Từ chối gia sư ID:", tutorId);
    setVisible(false);
  };

  // Cột cho bảng
  const columns = [
    {
      title: "Môn học",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Lớp",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Loại lớp",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Gia sư",
      dataIndex: "tutors",
      key: "tutors",
      render: (tutors) => (
        <Space>
          {tutors.map((tutor) => (
            <Tag
              key={tutor.id}
              color={tutor.status === "Pending" ? "blue" : "green"}
            >
              {<Link to="/chi-tiet-gia-su/1"> {tutor.name}</Link>}
              {tutor.status === "Pending" && (
                <Button
                  size="small"
                  icon={<CheckCircleOutlined />}
                  onClick={() => {
                    setSelectedTutor(tutor);
                    setVisible(true);
                  }}
                >
                  Chấp nhận
                </Button>
              )}
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <h1>Danh sách lớp học của bạn</h1>
      <Table
        dataSource={filteredClasses}
        columns={columns}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Xác nhận gia sư"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="reject" onClick={() => handleReject(selectedTutor?.id)}>
            Từ chối
          </Button>,
          <Button
            key="accept"
            type="primary"
            onClick={() => handleAccept(selectedTutor?.id)}
          >
            Đồng ý
          </Button>,
        ]}
      >
        <p>
          Bạn có chắc chắn muốn chấp nhận gia sư {selectedTutor?.name} không?
        </p>
      </Modal>
    </Container>
  );
}

export default ClassListByUser;
