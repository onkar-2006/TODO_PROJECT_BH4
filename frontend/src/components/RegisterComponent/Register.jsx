import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [msg, setMsg] = useState({ text: "", type: "" });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (msg.text) setMsg({ text: "", type: "" });
  };

  const showMsg = (text, type) => {
    setMsg({ text, type });
    if (type === "error") {
        setTimeout(() => setMsg({ text: "", type: "" }), 4000);
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        { withCredentials: true }
      );
      
      setMsg({ text: "Registration Successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/signin"), 2000);

    } catch (error) {
      const errorText = error.response?.data?.message || "Registration Failed";
      showMsg(errorText, "error");
    }
  };

  return (
    <div className="register-container" style={{ position: 'relative' }}>
      {msg.text && msg.type === "success" && (
        <div className="status-banner-inside success">
          ✅ {msg.text}
        </div>
      )}

      <img 
        src="https://media.licdn.com/dms/image/v2/C511BAQH7rpI_124aag/company-background_10000/company-background_10000/0/1583950464672/unsaidtalks_cover?e=2147483647&v=beta&t=pnJxVrBtNaDG8tJ26IyPDk2Nh0SK2FHgJzsNi5SPdWc" 
        alt="Banner" 
        className="register-banner"
      />

      <div className="header-section">
        <h2 className="form-title" style={{ color: 'white' }}>Create a new account</h2>
        <p>Already have an account? <Link to="/signin">Signin</Link></p>
      </div>
      
      <form onSubmit={HandleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input name="username" className="input-field" type="text" required onChange={HandleChange} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input name="email" className="input-field" type="email" required onChange={HandleChange} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input name="password" className="input-field" type="password" required onChange={HandleChange} />
          
          {msg.text && msg.type === "error" && (
            <span className="error-message">
               ⚠️ {msg.text}
            </span>
          )}
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;