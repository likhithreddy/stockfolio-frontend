import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

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
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add New Stock</h2>
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label>{key.replace(/_/g, " ")}</label>
          <input
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
      ))}
      <button onClick={submit} style={{ padding: "10px 20px" }}>
        Add Stock
      </button>
    </div>
  );
};

export default AddStockForm;
