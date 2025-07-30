import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItemVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle highlight on hover
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg shadow-sm" // Removed bg-dark
      style={{ backgroundColor: "#2c3e50" }} // Consistent dark background
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-bold">KoRe</span> {/* Text white and bold for visibility */}
        <button
          className="navbar-toggler border-0" // Removed border
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!userId ? (
              <>
                <li className="nav-item">
                  <motion.button
                    className="btn btn-outline-light rounded-pill px-3 mx-1" // Rounded pills and padding
                    onClick={() => navigate("/")}
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Login
                  </motion.button>
                </li>
                <li className="nav-item">
                  <motion.button
                    className="btn btn-outline-light rounded-pill px-3 mx-1"
                    onClick={() => navigate("/register")}
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Register
                  </motion.button>
                </li>
              </>
            ) : (
              <>
                {role === "admin" && (
                  <li className="nav-item">
                    <motion.button
                      className="btn btn-outline-light rounded-pill px-3 mx-1"
                      onClick={() => navigate("/admin")}
                      variants={navItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Admin Dashboard
                    </motion.button>
                  </li>
                )}
                {role === "investor" && (
                  <li className="nav-item">
                    <motion.button
                      className="btn btn-outline-light rounded-pill px-3 mx-1"
                      onClick={() => navigate("/dashboard")}
                      variants={navItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Investor Dashboard
                    </motion.button>
                  </li>
                )}
                <li className="nav-item">
                  <motion.button
                    className="btn btn-outline-danger rounded-pill px-3 mx-1"
                    onClick={logout}
                    variants={navItemVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Logout
                  </motion.button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
