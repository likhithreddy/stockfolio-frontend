import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Removed useScroll, useTransform
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
  focus: { scale: 1.02, borderColor: "#2575fc" },
  blur: { scale: 1, borderColor: "#ccc" },
};

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    secret: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Removed useScroll and useTransform as parallax is not suitable for this component

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.secret) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(API_ENDPOINTS.REGISTER, form);
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <motion.div
      className="d-flex justify-content-center align-items-center vh-100" // Bootstrap classes for full-page centering
      style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }} // Keep background for visual appeal
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="card p-4 shadow-lg" style={styles.cardOverride}> {/* Bootstrap card classes */}
        <h2 className="mb-4 text-center" style={styles.headingOverride}>Investor Registration</h2> {/* Bootstrap margin and text-center */}
        {["firstname", "lastname", "email", "secret"].map((field) => (
          <div className="mb-3" key={field}> {/* Bootstrap margin-bottom */}
            <label className="form-label" style={styles.labelOverride}>{field.charAt(0).toUpperCase() + field.slice(1)}</label> {/* Bootstrap form-label */}
            <motion.input
              type={field === "secret" ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control" // Bootstrap form control
              whileFocus="focus"
              variants={fieldVariants}
            />
          </div>
        ))}
        {error && <div className="alert alert-danger" style={styles.errorOverride}>{error}</div>} {/* Bootstrap alert for errors */}
        <motion.button
          onClick={submit}
          className="btn btn-primary w-100 mt-3" // Bootstrap button classes
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const styles = {
  // Keep only overrides or non-Bootstrap specific styles
  cardOverride: {
    maxWidth: "400px",
    borderRadius: "16px",
  },
  headingOverride: {
    color: "#333",
  },
  labelOverride: {
    fontWeight: "bold",
  },
  errorOverride: {
    textAlign: "center",
  },
};

export default RegisterPage;
