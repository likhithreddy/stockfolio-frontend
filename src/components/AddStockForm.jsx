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

const AddStockForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    symbol: "",
    company_name: "",
    current_value: "",
    sector: "",
    market_cap: "",
    volatility: "MEDIUM",
    average_return: "",
    stock_exchange: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await axios.post(API_ENDPOINTS.ADMIN_ADD_STOCK, form);
      alert("Stock added successfully!");
      navigate("/admin");
    } catch (err) {
      alert("Error adding stock: " + err.response?.data?.error);
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
        <h2 className="text-center mb-4">Add New Stock</h2>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}> {/* Bootstrap margin-bottom */}
            <label className="form-label">{key.replace(/_/g, " ")}</label>
            <motion.input
              type={key === "current_value" || key === "market_cap" || key === "average_return" ? "number" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              className="form-control" // Bootstrap form control
              whileFocus="focus"
              variants={fieldVariants}
            />
          </div>
        ))}
        <motion.button
          onClick={submit}
          className="btn btn-primary w-100 mt-3" // Bootstrap button classes
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Stock
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddStockForm;
