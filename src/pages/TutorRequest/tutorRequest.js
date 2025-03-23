import { useState, useEffect, useContext } from "react";
import "./style.css"; // Import file CSS riêng
import { AuthContext } from "../../context/auth";

export default function TutorRequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { booksList, accounts, setBooksList } = useContext(AuthContext);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const filteredBooksList = booksList.filter(
      (request) => request.tutor === parsedUser.id
    );

    const combinedData = filteredBooksList.map((request) => {
      const userInfo = accounts.find((account) => account.id === request.user);
      return {
        ...request,
        userInfo,
      };
    });

    setRequests(combinedData);
    setLoading(false);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Đợi duyệt":
        return "status-pending";
      case "Chấp nhận":
        return "status-approved";
      case "Từ chối":
        return "status-rejected";
      default:
        return "status-default";
    }
  };

  const handleAprove = (id) => {
    const updatedBookList = booksList.map((item) =>
      item.id === id ? { ...item, status: "Chấp nhận" } : item
    );
    setBooksList(updatedBookList);
  };

  const handleReject = (id) => {
    const updatedBookList = booksList.map((item) =>
      item.id === id ? { ...item, status: "Từ chối" } : item
    );

    setBooksList(updatedBookList);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Danh sách yêu cầu dạy học</h1>

      {requests.length === 0 ? (
        <p className="no-data-message">Không có yêu cầu nào</p>
      ) : (
        <div className="table-container">
          <table className="request-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Ngày yêu cầu</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {request.userInfo
                      ? `${request.userInfo.lastName} ${request.userInfo.firstName}`
                      : "Không có thông tin"}
                  </td>
                  <td>
                    {request.userInfo
                      ? request.userInfo.phone
                      : "Không có thông tin"}
                  </td>
                  <td>
                    {request.userInfo
                      ? request.userInfo.email
                      : "Không có thông tin"}
                  </td>
                  <td>
                    {request.userInfo
                      ? request.userInfo.address
                      : "Không có thông tin"}
                  </td>
                  <td>{request.crateDate}</td>
                  <td>
                    <span
                      className={`status-books ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === "Đợi duyệt" && (
                      <div className="action-buttons">
                        <button
                          className="approve-button"
                          onClick={() => handleAprove(request.id)}
                        >
                          Duyệt
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleReject(request.id)}
                        >
                          Từ chối
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
