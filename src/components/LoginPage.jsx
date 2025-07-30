import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const fieldVariants = {
  focus: { scale: 1.02, borderColor: "#007bff", boxShadow: "0 0 0 0.25rem rgba(0, 123, 255, 0.25)" }, // Bootstrap primary color for focus, added box-shadow
  blur: { scale: 1, borderColor: "#ced4da", boxShadow: "none" }, // Bootstrap default border color, removed box-shadow
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, null, {
        params: { email, password },
      });

      const { userId, lastName, role } = response.data;
      setMessage(`Welcome, ${lastName}! Your User ID is ${userId}.`);

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#2c3e50" }} // Consistent dark background
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="card p-4 shadow-lg" style={{ maxWidth: "400px", borderRadius: "16px", border: "none" }}>
        <h2 className="mb-4 text-center text-dark fw-bold">Investor Login</h2> {/* Added fw-bold for bolder text */}
        <div className="mb-3">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-control-lg border-0 shadow-sm" // Added border-0 and shadow-sm
            whileFocus="focus"
            variants={fieldVariants}
          />
        </div>
        <div className="mb-3">
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-control-lg border-0 shadow-sm" // Added border-0 and shadow-sm
            whileFocus="focus"
            variants={fieldVariants}
          />
        </div>
        <motion.button
          onClick={login}
          className="btn btn-primary btn-lg w-100 mt-3 rounded-pill shadow" // Added rounded-pill and shadow
          whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }} // Darken button on hover
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
        {message && <p className="mt-3 text-center text-muted">{message}</p>}
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
