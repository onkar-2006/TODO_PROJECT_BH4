import { useState } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom"; 

function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (msg.text) setMsg({ text: "", type: "" });
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                data, 
                { withCredentials: true }
            );

            setMsg({ text: "Login Successful!", type: "success" });
            setTimeout(() => navigate("/home"), 1000);
        } catch (error) {
            const errorText = error.response?.data?.message || "Invalid Credentials";
            setMsg({ text: errorText, type: "error" });
        }
    };

    return (
        <div className="register-container">
            {msg.text && msg.type === "success" && (
                <div className="status-banner-inside success">
                    ✅ {msg.text}
                </div>
            )}

            <img 
                src="https://media.licdn.com/dms/image/v2/C511BAQH7rpI_124aag/company-background_10000/company-background_10000/0/1583950464672/unsaidtalks_cover?e=2147483647&v=beta&t=pnJxVrBtNaDG8tJ26IyPDk2Nh0SK2FHgJzsNi5SPdWc" 
                alt="UnsaidTalks Banner" 
                className="register-banner"
            />

            <div className="header-section">
                <h2 className="form-title">Login</h2>
                <p>Don't have an account yet? <Link to="/register">Register Now</Link></p>
            </div>

            <form onSubmit={HandleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        name="email"
                        className="input-field"
                        type="email"
                        required
                        onChange={HandleChange}
                    />
                </div>
                
                <div className="input-group">
                    <label>Password</label>
                    <input
                        name="password"
                        className="input-field"
                        type="password"
                        required
                        onChange={HandleChange}
                    />
                    
                    {msg.text && msg.type === "error" && (
                        <p className="error-text-small">
                           ⚠️ {msg.text}
                        </p>
                    )}
                </div>

                <button type="submit" className="register-button">Login</button>
            </form>
        </div>
    );
}

export default Login;

