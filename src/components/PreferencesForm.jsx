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

const PreferencesForm = ({ current, onUpdate }) => {
  const [preferred_sector, setSector] = useState(
    current?.preferred_sector || ""
  );
  const [preferred_risk_level, setRisk] = useState(
    current?.preferred_risk_level || ""
  );
  const [notification_enabled, setNotify] = useState(
    current?.notification_enabled || false
  );
  const [message, setMessage] = useState("");

  const save = async () => {
    try {
      await axios.post(API_ENDPOINTS.PREFERENCES, {
        user_id: localStorage.getItem("userId"),
        preferred_sector,
        preferred_risk_level,
        notification_enabled,
      });
      setMessage("Preferences saved!");
      onUpdate();
    } catch {
      setMessage("Failed to save.");
    }
  };

  return (
    <motion.div className="card p-3 mt-3" variants={formVariants} initial="hidden" animate="visible"> {/* Bootstrap card and padding */}
      <h3 className="mb-3">Update Preferences</h3> {/* Bootstrap margin-bottom */}
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.input
          type="text"
          value={preferred_sector}
          onChange={(e) => setSector(e.target.value)}
          placeholder="Preferred Sector"
          className="form-control" // Bootstrap form control
          variants={fieldVariants}
          whileFocus="focus"
        />
      </div>
      <div className="mb-3"> {/* Bootstrap margin-bottom */}
        <motion.select
          value={preferred_risk_level}
          onChange={(e) => setRisk(e.target.value)}
          className="form-select" // Bootstrap form select
          variants={fieldVariants}
          whileFocus="focus"
        >
          <option value="">-- Select Risk Level --</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </motion.select>
      </div>
      <motion.div className="form-check mb-3" whileHover={{ scale: 1.05 }}> {/* Bootstrap form check */}
        <input
          type="checkbox"
          checked={notification_enabled}
          onChange={(e) => setNotify(e.target.checked)}
          className="form-check-input" // Bootstrap form check input
          id="notificationToggle"
        />
        <label className="form-check-label" htmlFor="notificationToggle"> {/* Bootstrap form check label */}
          Enable Notifications
        </label>
      </motion.div>
      <motion.button
        onClick={save}
        className="btn btn-primary w-100" // Bootstrap button classes
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save Preferences
      </motion.button>
      {message && <p className="mt-2 text-center text-muted">{message}</p>} {/* Bootstrap margin-top, text-center, text-muted */}
    </motion.div>
  );
};

export default PreferencesForm;
