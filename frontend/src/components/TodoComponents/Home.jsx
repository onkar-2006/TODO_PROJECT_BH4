import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./todo.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({ title: "", dueDate: "" });
  const [msg, setMsg] = useState({ text: "", type: "" }); 
  const navigate = useNavigate();

  // Axios instance
  const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
  });

  const showMsg = (text, type) => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/my-tasks");
      if (data.success) setTasks(data.todos);
    } catch (err) {
      // If unauthorized, send to login
      if (err.response?.status === 401) navigate("/signin");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/new", taskData);
      setTaskData({ title: "", dueDate: "" });
      showMsg("Task added successfully!", "success");
      fetchTasks();
    } catch (err) {
      showMsg("Error adding task", "error");
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.put(`/update/${id}`);
      showMsg("Status updated", "success");
      fetchTasks();
    } catch (err) {
      showMsg("Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/task/${id}`);
      showMsg("Task deleted", "success");
      fetchTasks();
    } catch (err) {
      showMsg("Delete failed", "error");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
      navigate("/signin");
    } catch (err) {
      navigate("/signin");
    }
  };

  return (
    <div className="dashboard-wrapper">
      {msg.text && (
        <div className={`status-banner-inside ${msg.type}`}>
          {msg.type === "success" ? "✅" : "❌"} {msg.text}
        </div>
      )}

      <nav className="top-nav">
        <div className="logo-area">
          <img 
            src="https://media.licdn.com/dms/image/v2/C511BAQH7rpI_124aag/company-background_10000/company-background_10000/0/1583950464672/unsaidtalks_cover?e=2147483647&v=beta&t=pnJxVrBtNaDG8tJ26IyPDk2Nh0SK2FHgJzsNi5SPdWc" 
            alt="Logo" className="nav-logo-img" 
          />
          <div className="brand-stack">
            <span className="brand-name">unsaidTalks™</span>
            <span className="brand-tagline">UNFOLD SUCCESS FROM UNTOLD EXPERIENCES</span>
          </div>
        </div>
        
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <main className="container">
        {/* FORM SECTION */}
        <form className="task-input-card" onSubmit={handleAdd}>
          <div className="field">
            <label>Task Name</label>
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              required
              value={taskData.title}
              onChange={(e) => setTaskData({...taskData, title: e.target.value})}
            />
          </div>
          <div className="field">
            <label>Due Date</label>
            <input 
                type="date" 
                required
                value={taskData.dueDate}
                onChange={(e) => setTaskData({...taskData, dueDate: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-add">+ Add</button>
        </form>

        {/* LIST SECTION */}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className={`task-row ${task.isCompleted ? 'is-done' : ''}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleToggle(task._id)} className="status-btn">
                  {task.isCompleted ? "✅ Done" : "⭕ Mark Done"}
                </button>
                <button onClick={() => handleDelete(task._id)} className="delete-btn">🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="empty-view">
            <div className="icon-circle"><span className="glass-icon">🔍</span></div>
            <h2>No tasks yet</h2>
            <p>Add a task above to get started!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;