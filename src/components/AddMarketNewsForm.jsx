import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fieldVariants = {
  focus: { scale: 1.02, borderColor: "#2575fc" },
};

const AddMarketNewsForm = () => {
  const [form, setForm] = useState({
    stock_id: "",
    headline: "",
    news_source: "",
    impact_score: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    const score = parseInt(form.impact_score);

    if (
      !form.stock_id ||
      !form.headline ||
      !form.news_source ||
      !form.impact_score
    ) {
      return "All fields are required";
    }

    if (isNaN(score) || score < 0 || score > 100) {
      return "Impact score must be a number between 0 and 100";
    }

    return "";
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(API_ENDPOINTS.ADMIN_ADD_MARKET_NEWS, form);
      alert("Market news added!");
      navigate("/admin");
    } catch (err) {
      setError("Error: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <motion.div
      className="container mt-5" // Bootstrap container
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "500px" }}> {/* Bootstrap card and centering */}
        <h2 className="text-center mb-4">Add Market News</h2>
        {["stock_id", "headline", "news_source", "impact_score"].map((field) => (
          <div className="mb-3" key={field}> {/* Bootstrap margin-bottom */}
            <label className="form-label">{field.replace(/_/g, " ")}</label>
            <motion.input
              type={
                field === "impact_score" || field === "stock_id"
                  ? "number"
                  : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control" // Bootstrap form control
              whileFocus="focus"
              variants={fieldVariants}
            />
          </div>
        ))}
        {error && (
          <div className="alert alert-danger text-center">{error}</div> // Bootstrap alert for errors
        )}
        <motion.button
          onClick={submit}
          className="btn btn-primary w-100 mt-3" // Bootstrap button classes
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddMarketNewsForm;
