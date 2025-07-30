import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";

const TradeStockForm = ({ portfolios, stockId, symbol, onTrade }) => {
  const user_id = localStorage.getItem("userId");
  const [form, setForm] = useState({
    portfolio_id: portfolios?.[0]?.portfolio_id || "",
    buy_or_sell: "BUY",
    quantity: 1,
    order_type: "MARKET",
    transaction_mode: "Online",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await axios.post(API_ENDPOINTS.TRADE, {
        ...form,
        user_id,
        stock_id: stockId,
      });
      setMessage("Trade executed!");
      onTrade();
    } catch (err) {
      setMessage("Failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  };

  const fieldVariants = {
    focus: { scale: 1.02, borderColor: "#2575fc" },
  };

  return (
    <motion.div 
      className="card p-3 mt-3" // Bootstrap card and padding
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h4 className="mb-3">Trade {symbol}</h4> {/* Bootstrap margin-bottom */}
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.select
          name="portfolio_id"
          value={form.portfolio_id}
          onChange={handleChange}
          className="form-select" // Bootstrap form select
          variants={fieldVariants}
          whileFocus="focus"
        >
          {portfolios.map((p) => (
            <option key={p.portfolio_id} value={p.portfolio_id}>
              {p.portfolio_name}
            </option>
          ))}
        </motion.select>
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.select
          name="buy_or_sell"
          value={form.buy_or_sell}
          onChange={handleChange}
          className="form-select" // Bootstrap form select
          variants={fieldVariants}
          whileFocus="focus"
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </motion.select>
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.select 
          name="order_type" 
          value={form.order_type} 
          onChange={handleChange}
          className="form-select" // Bootstrap form select
          variants={fieldVariants}
          whileFocus="focus"
        >
          <option value="MARKET">Market</option>
          <option value="LIMIT">Limit</option>
          <option value="STOP">Stop</option>
          <option value="STOP_LIMIT">Stop-Limit</option>
        </motion.select>
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          name="transaction_mode"
          value={form.transaction_mode}
          onChange={handleChange}
          placeholder="Transaction Mode"
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <motion.button 
        onClick={submit}
        className="btn btn-primary w-100" // Bootstrap button classes
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Execute
      </motion.button>
      {message && <p className="mt-2 text-center text-muted">{message}</p>} {/* Bootstrap margin-top, text-center, text-muted */}
    </motion.div>
  );
};

export default TradeStockForm;
