// App.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setIsLogin, accounts } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      const userData = {
        email: account.email,
        role: account.role,
        address: account.address,
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        phone: account.phone,
        birthDate: account.birthDate,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setIsLogin(true);
      navigate("/");
    } else {
      setError("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
