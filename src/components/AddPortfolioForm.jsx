import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fieldVariants = {
  focus: { scale: 1.02, borderColor: "#2575fc" },
};

const AddPortfolioForm = ({ onAdded }) => {
  const user_id = localStorage.getItem("userId");
  const [portfolio_name, setPortfolioName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!portfolio_name) {
      setMessage("Portfolio name cannot be empty");
      return;
    }
    try {
      await axios.post(API_ENDPOINTS.PORTFOLIO, { user_id, portfolio_name });
      setMessage("Portfolio created!");
      setPortfolioName("");
      onAdded();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create");
    }
  };

  return (
    <motion.div className="card p-3 mt-3" variants={formVariants} initial="hidden" animate="visible"> {/* Bootstrap card and padding */}
      <h3 className="mb-3">Add Portfolio</h3> {/* Bootstrap margin-bottom */}
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          type="text"
          placeholder="Portfolio Name"
          value={portfolio_name}
          onChange={(e) => setPortfolioName(e.target.value)}
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <motion.button onClick={submit} className="btn btn-primary w-100" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Create
      </motion.button>
      {message && <p className="mt-2 text-center text-muted">{message}</p>} {/* Bootstrap margin-top, text-center, text-muted */}
    </motion.div>
  );
};

export default AddPortfolioForm;
