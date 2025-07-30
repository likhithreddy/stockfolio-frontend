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

const AddGoalForm = ({ onGoalAdded }) => {
  const user_id = localStorage.getItem("userId");
  const [goal_name, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [target_date, setTargetDate] = useState("");
  const [message, setMessage] = useState("");

  const submitGoal = async () => {
    if (!goal_name || !target_amount || !target_date) {
      setMessage("All fields are required.");
      return;
    }
    try {
      await axios.post(API_ENDPOINTS.GOAL, { user_id, goal_name, target_amount, target_date });
      setMessage("Goal saved!");
      setGoalName("");
      setTargetAmount("");
      setTargetDate("");
      onGoalAdded();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to save goal.");
    }
  };

  return (
    <motion.div className="card p-3 mt-3" variants={formVariants} initial="hidden" animate="visible"> {/* Bootstrap card and padding */}
      <h3 className="mb-3">Add / Update Goal</h3> {/* Bootstrap margin-bottom */}
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          type="text"
          placeholder="Goal name"
          value={goal_name}
          onChange={(e) => setGoalName(e.target.value)}
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          type="number"
          placeholder="Target amount"
          value={target_amount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          type="date"
          value={target_date}
          onChange={(e) => setTargetDate(e.target.value)}
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <motion.button onClick={submitGoal} className="btn btn-primary w-100" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Save Goal
      </motion.button>
      {message && <p className="mt-2 text-center text-muted">{message}</p>} {/* Bootstrap margin-top, text-center, text-muted */}
    </motion.div>
  );
};

export default AddGoalForm;
