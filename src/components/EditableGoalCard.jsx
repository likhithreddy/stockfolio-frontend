import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";

const goalCardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
};

const contentVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const EditableGoalCard = ({ goal, onGoalUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...goal });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      await axios.post(API_ENDPOINTS.GOAL, { user_id: localStorage.getItem("userId"), ...form });
      setMessage("Goal updated!");
      setIsEditing(false);
      onGoalUpdated();
    } catch (err) {
      setMessage("Update failed.");
    }
  };

  const remove = async () => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      await axios.delete(API_ENDPOINTS.GOAL_DELETE(goal.goal_id));
      onGoalUpdated();
    } catch {
      setMessage("Delete failed.");
    }
  };

  return (
    <motion.div
      className="card p-3 mt-3" // Bootstrap card and padding
      variants={goalCardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
      transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
    >
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div key="edit" variants={contentVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <div className="mb-3"> {/* Bootstrap margin-bottom */}
              <input name="goal_name" value={form.goal_name} onChange={handleChange} className="form-control" /> {/* Bootstrap form control */}
            </div>
            <div className="mb-3"> {/* Bootstrap margin-bottom */}
              <input name="target_amount" type="number" value={form.target_amount} onChange={handleChange} className="form-control" /> {/* Bootstrap form control */}
            </div>
            <div className="mb-3"> {/* Bootstrap margin-bottom */}
              <input name="target_date" type="date" value={form.target_date} onChange={handleChange} className="form-control" /> {/* Bootstrap form control */}
            </div>
            <motion.button className="btn btn-primary me-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={save}>Save</motion.button> {/* Bootstrap button and margin-end */}
            <motion.button className="btn btn-secondary" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsEditing(false)}>Cancel</motion.button> {/* Bootstrap button */}
          </motion.div>
        ) : (
          <motion.div key="view" variants={contentVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
            <strong>{goal.goal_name}</strong> - Target: ${goal.target_amount} by {new Date(goal.target_date).toLocaleDateString()}
            <br />
            <br />
            <motion.button className="btn btn-info me-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsEditing(true)}>Edit</motion.button> {/* Bootstrap button and margin-end */}
            <motion.button className="btn btn-danger" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={remove}>Delete</motion.button> {/* Bootstrap button */}
          </motion.div>
        )}
      </AnimatePresence>
      {message && <p className="mt-2 text-center text-muted">{message}</p>} {/* Bootstrap margin-top, text-center, text-muted */}
    </motion.div>
  );
};

export default EditableGoalCard;
