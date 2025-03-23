import React, { useState } from "react";
import { Table, Button, Modal, Image, Form, Input, Select } from "antd";
import "./style.css";

// Sample Data with Status Property for Approval
const initialAccounts = [
  {
    id: 1,
    firstName: "Trần",
    lastName: "Linh",
    phone: "0123456789",
    birthDate: "20-12-2002",
    email: "admin@example.com",
    password: "admin123",
    gender: "female",
    role: "admin",
    address: "Thạch Thất, Hà Nội",
    status: "Approved", // Account is already approved as admin
    cccdImage: "https://ddk.1cdn.vn/2022/09/25/image.daidoanket.vn-images-upload-phuongtv-09252022-_can-cuoc-cong-dan-co-lam-gia-duoc-khong-1.jpg", // Example image path
  },
  {
    id: 2,
    firstName: "Trần",
    lastName: "Linh",
    gender: "female",
    phone: "0123456789",
    birthDate: "20-12-2002",
    email: "tutor@example.com",
    password: "tutor123",
    role: "tutor",
    address: "Hà Đông, Hà Nội",
    status: "Pending", // Account pending approval
    cccdImage: "https://ddk.1cdn.vn/2022/09/25/image.daidoanket.vn-images-upload-phuongtv-09252022-_can-cuoc-cong-dan-co-lam-gia-duoc-khong-1.jpg", // Example image path
    subject: "Anh, Hóa, Toán",
    university: "Đại học sư phạm",
    major: "Sư phạm toán",
  },
  {
    id: 3,
    firstName: "Hoàng",
    lastName: "Minh",
    phone: "0123456789",
    gender: "male",
    birthDate: "20-12-2002",
    email: "student1@example.com",
    password: "student123",
    role: "student",
    address: "Long Biên, Hà Nội",
    status: "Approved", // Approved student account
    cccdImage: "https://ddk.1cdn.vn/2022/09/25/image.daidoanket.vn-images-upload-phuongtv-09252022-_can-cuoc-cong-dan-co-lam-gia-duoc-khong-1.jpg", // Example image path
  },
];

// Main Component
function ListAccountAdmin() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Handle Modal Open and Close
  const handleModalOpen = (account) => {
    setSelectedAccount(account);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Handle Approve/Reject Action
  const handleAction = (action) => {
    if (selectedAccount) {
      // Update status based on action
      const updatedAccounts = accounts.map(account =>
        account.id === selectedAccount.id
          ? { ...account, status: action === "Approve" ? "Approved" : "Rejected" }
          : account
      );
      setAccounts(updatedAccounts); // Update state
      alert(`${action} account for ${selectedAccount.firstName} ${selectedAccount.lastName}`);
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => `${text} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Approved" ? "green" : status === "Rejected" ? "red" : "orange" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => handleModalOpen(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="account-admin">
      <h1>Account Management</h1>
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey="id"
      />

      {selectedAccount && (
        <Modal
          title="Account Details"
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="reject" onClick={() => handleAction("Reject")}>
              Reject
            </Button>,
            <Button key="approve" type="primary" onClick={() => handleAction("Approve")}>
              Approve
            </Button>,
          ]}
        >
          <Form layout="vertical">
            <Form.Item label="Full Name">
              <Input value={`${selectedAccount.firstName} ${selectedAccount.lastName}`} disabled />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={selectedAccount.email} disabled />
            </Form.Item>
            <Form.Item label="Phone">
              <Input value={selectedAccount.phone} disabled />
            </Form.Item>
            <Form.Item label="Role">
              <Input value={selectedAccount.role} disabled />
            </Form.Item>
            <Form.Item label="Address">
              <Input value={selectedAccount.address} disabled />
            </Form.Item>
            {selectedAccount.role === "tutor" && (
              <>
                <Form.Item label="Subject">
                  <Input value={selectedAccount.subject} disabled />
                </Form.Item>
                <Form.Item label="University">
                  <Input value={selectedAccount.university} disabled />
                </Form.Item>
                <Form.Item label="Major">
                  <Input value={selectedAccount.major} disabled />
                </Form.Item>
              </>
            )}
            <Form.Item label="CCCD Image">
              <Image
                src={selectedAccount.cccdImage}
                alt="CCCD"
                style={{ width: 200 }}
                preview={{ visible: false }}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default ListAccountAdmin;
