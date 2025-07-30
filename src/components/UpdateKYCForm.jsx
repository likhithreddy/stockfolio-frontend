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

const UpdateKYCForm = () => {
  const [userId, setUserId] = useState("");
  const [kycDone, setKycDone] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await axios.post(API_ENDPOINTS.ADMIN_UPDATE_KYC, {
        user_id: userId,
        is_kyc_done: kycDone,
      });
      alert("KYC status updated!");
      navigate("/admin");
    } catch (err) {
      alert("Error: " + err.response?.data?.error);
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
        <h2 className="text-center mb-4">Update User KYC Status</h2>
        <div className="mb-3"> {/* Bootstrap margin-bottom */}
          <motion.input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-control" // Bootstrap form control
            whileFocus="focus"
            variants={fieldVariants}
          />
        </div>
        <motion.div className="form-check mb-3" whileHover={{ scale: 1.05 }}> {/* Bootstrap form check */}
          <input
            type="checkbox"
            checked={kycDone}
            onChange={(e) => setKycDone(e.target.checked)}
            className="form-check-input" // Bootstrap form check input
            id="kycCheckbox"
          />
          <label className="form-check-label" htmlFor="kycCheckbox"> {/* Bootstrap form check label */}
            KYC Completed
          </label>
        </motion.div>
        <motion.button
          onClick={submit}
          className="btn btn-primary w-100 mt-3" // Bootstrap button classes
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update KYC
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UpdateKYCForm;
