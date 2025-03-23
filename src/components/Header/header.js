import { Tooltip } from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import config from "../../configs";
import { AuthContext } from "../../context/auth";
import "./style.css";
import Notification from "../NotificationComponent/notification";

function Header() {
  const { isLogin, setIsLogin } = useContext(AuthContext);

  const [userLogin, setUserLogin] = useState({});
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      setUserLogin(JSON.parse(user));
    }
  }, [user]);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="header">
      <Container fluid>
        <div className="header-wrapper">
          <div className="header-logo">
            <Link to={"/"}>
              <img
                src="./assets/logo/logo.svg"
                alt="logo"
                className="header-logo--img"
              />
            </Link>
          </div>

          <div className="header-menu">
            <ul className="header-nav">
              <li className="header-nav--list ">
                <Link to="/" className="action">
                  Trang chủ
                </Link>
              </li>
              <li className="header-nav--list">
                <Link>Lớp học gia sư</Link>
              </li>
              <li className="header-nav--list">
                <Link>Trung tâm dạy học</Link>
              </li>
              <li className="header-nav--list">
                <Link>Ôn tập</Link>
              </li>
            </ul>
          </div>

          {isLogin ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                trigger="click"
                color="#fff"
                title={
                  <div className="header-user--tooltip">
                    {userLogin?.role == "student" ? (
                      <ul className="header-user--list">
                        <li className="header-user--item">
                          <Link to={`/${config.router.info}`}>Thông tin</Link>
                        </li>

                        <li className="header-user--item">
                          <Link to={`/${config.router.createClass}`}>
                            Đăng lớp tìm gia sư
                          </Link>
                        </li>
                        <li className="header-user--item">
                          <Link to={`/${config.router.classUser}`}>
                            Danh sách lớp
                          </Link>
                        </li>
                        <li className="header-user--item">
                          <button onClick={handleLogout}>Đăng xuất</button>
                        </li>
                      </ul>
                    ) : (
                      <ul className="header-user--list">
                        <li className="header-user--item">
                          <Link to={`/${config.router.info}`}>Thông tin</Link>
                        </li>
                        <li className="header-user--item">
                          <Link to={`/${config.router.tutorRequest}`}>
                            Danh sách yêu cầu dạy học
                          </Link>
                        </li>
                        <li className="header-user--item">
                          <Link to={`/${config.router.classList}`}>
                            Tìm lớp dạy
                          </Link>
                        </li>
                        <li className="header-user--item">
                          <button onClick={handleLogout}>Đăng xuất</button>
                        </li>
                      </ul>
                    )}
                  </div>
                }
              >
                <div className="header-user--avatar">
                  <img
                    src="/assets/images/Hinh-gai-xinh-Viet-Nam-ngau.jpg"
                    alt="avatar"
                  />
                </div>
              </Tooltip>
              <Notification />
            </div>
          ) : (
            <div className="header-user">
              <Link to="/dang-ky" className="header-signup">
                Đăng ký
              </Link>
              <Link to={`/${config.router.login}`} className="header-signin">
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
