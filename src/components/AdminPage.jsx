import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Removed useScroll, useTransform

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05, backgroundColor: "#1a5bbd" }, // Darken on hover
  tap: { scale: 0.95 },
};

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="container text-center mt-5" // Bootstrap classes
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1 className="mb-4" variants={buttonVariants}>Admin Dashboard</motion.h1>
      <motion.p className="lead mb-5" variants={buttonVariants}>Welcome, Admin! Choose an action:</motion.p>

      <div className="d-grid gap-3 col-md-8 mx-auto"> {/* Bootstrap grid for buttons */}
        <motion.button
          onClick={() => navigate("/admin/add-stock")}
          className="btn btn-primary btn-lg" // Bootstrap button classes
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Add New Stock
        </motion.button>

        <motion.button
          onClick={() => navigate("/admin/add-exchange")}
          className="btn btn-primary btn-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Add Stock Exchange
        </motion.button>
        <motion.button
          onClick={() => navigate("/admin/update-kyc")}
          className="btn btn-primary btn-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Update KYC Status
        </motion.button>
        <motion.button
          onClick={() => navigate("/admin/update-price-history")}
          className="btn btn-primary btn-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Update Stock Price History
        </motion.button>
        <motion.button
          onClick={() => navigate("/admin/add-market-news")}
          className="btn btn-primary btn-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Add Market News
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdminPage;
