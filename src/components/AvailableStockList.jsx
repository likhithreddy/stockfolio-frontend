import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";
import { staggerContainer, fadeInUp } from "../animations/variants";

const AvailableStockList = ({ onAdded }) => {
  const [stocks, setStocks] = useState([]);
  const user_id = localStorage.getItem("userId");

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(API_ENDPOINTS.STOCK_ALL);
      setStocks(res.data);
    };
    load();
  }, []);

  const addToWatchlist = async (stock_id) => {
    try {
      await axios.post(API_ENDPOINTS.WATCHLIST_ADD, { user_id, stock_id });
      alert("Added to watchlist!");
      onAdded();
    } catch (err) {
      alert("Failed to add: " + (err.response?.data?.error || "Unknown"));
    }
  };

  return (
    <motion.div className="card p-3 mt-3" variants={staggerContainer} initial="hidden" animate="visible"> {/* Bootstrap card and padding */}
      <h3 className="mb-3">Available Stocks</h3> {/* Bootstrap margin-bottom */}
      <motion.ul className="list-group list-group-flush"> {/* Bootstrap list group */}
        {stocks.map((s) => (
          <motion.li
            key={s.stock_id}
            className="list-group-item d-flex justify-content-between align-items-center" // Bootstrap list group item, flex, justify, align
            variants={fadeInUp}
            whileHover={{ scale: 1.03, backgroundColor: "rgba(0,0,0,0.05)" }}
          >
            <span>
              <strong>{s.symbol}</strong> – {s.company_name} (${s.current_value})
            </span>
            <motion.button
              onClick={() => addToWatchlist(s.stock_id)}
              className="btn btn-sm btn-primary" // Bootstrap button classes
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default AvailableStockList;
