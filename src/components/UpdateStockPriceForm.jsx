import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Removed useScroll, useTransform
import { API_ENDPOINTS } from "../config/api";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fieldVariants = {
  focus: { scale: 1.02, borderColor: "#2575fc" },
};

const UpdateStockPriceForm = () => {
  const [form, setForm] = useState({
    stock_id: "",
    opening_price: "",
    closing_price: "",
    highest_price: "",
    lowest_price: "",
    adjusted_close: "",
    volume: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const validate = () => {
    const prices = [
      "opening_price",
      "closing_price",
      "highest_price",
      "lowest_price",
      "adjusted_close",
    ];

    for (const key of prices) {
      if (!isNumeric(form[key])) {
        return `${key.replace(/_/g, " ")} must be a valid number`;
      }
    }

    if (!form.stock_id || !form.volume)
      return "Stock ID and volume are required";
    if (!isNumeric(form.volume)) return "Volume must be a valid number";

    const o = parseFloat(form.opening_price);
    const c = parseFloat(form.closing_price);
    const h = parseFloat(form.highest_price);
    const l = parseFloat(form.lowest_price);

    if (h < o || h < c || h < l)
      return "Highest price must be greater than or equal to opening, closing, and lowest prices";
    if (l > o || l > c || l > h)
      return "Lowest price must be less than or equal to opening, closing, and highest prices";

    return "";
  };

  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post(API_ENDPOINTS.ADMIN_UPDATE_PRICE_HISTORY, form);
      alert("Stock price history updated!");
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
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "400px" }}> {/* Bootstrap card and centering */}
        <h2 className="text-center mb-4">Update Stock Price History</h2>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}> {/* Bootstrap margin-bottom */}
            <label className="form-label">{key.replace(/_/g, " ")}</label>
            <motion.input
              type={["stock_id", "volume"].includes(key) ? "number" : "text"}
              name={key}
              value={value}
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

export default UpdateStockPriceForm;
