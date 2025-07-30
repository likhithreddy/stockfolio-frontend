import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectorChart from "./SectorChart";
import AddGoalForm from "./AddGoalForm";
import EditableGoalCard from "./EditableGoalCard";
import PreferencesForm from "./PreferencesForm";
import TradeStockForm from "./TradeStockForm";
import AvailableStockList from "./AvailableStockList";
import AddPortfolioForm from "./AddPortfolioForm";
import NewsFeed from "./NewsFeed";
import { API_ENDPOINTS } from "../config/api";
import { staggerContainer, fadeInUp } from "../animations/variants";

import axios from "axios";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadDashboard = async () => {
      const response = await axios.get(API_ENDPOINTS.USER_DASHBOARD, {
        params: { userId },
      });
      setData(response.data);
    };
    loadDashboard();
  }, [userId]);

  if (!data) return <p className="text-center mt-5">Loading...</p>;

  const { userInfo, preferences, goals, portfolios, holdings, watchlist } =
    data;

  return (
    <motion.div
      className="container mt-4" // Bootstrap container with margin-top
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-center mb-4" variants={fadeInUp}>Investor Dashboard</motion.h1>
      {/*Profile Section */}
      <motion.section className="card p-4 mb-4 shadow-sm" variants={fadeInUp}>
        <h2 className="card-title">Welcome, {userInfo.firstname} {userInfo.lastname}</h2>
        <p className="card-text">Email: {userInfo.email}</p>
        <p className="card-text">
          KYC Status:{" "}
          <span className={`badge bg-${userInfo.is_kyc_done ? "success" : "warning"}`}> {/* Bootstrap badge for status */}
            {userInfo.is_kyc_done ? "Done" : "Pending"}
          </span>
        </p>
      </motion.section>
      {/*Preferences */}
      <motion.section className="card p-4 mb-4 shadow-sm" variants={fadeInUp}>
        <h2 className="card-title">Preferences</h2>
        <p className="card-text">Preferred Sector: {preferences?.preferred_sector || "N/A"}</p>
        <p className="card-text">Risk Level: {preferences?.preferred_risk_level || "N/A"}</p>
        <p className="card-text">
          Notifications:{" "}
          <span className={`badge bg-${preferences?.notification_enabled ? "success" : "danger"}`}> {/* Bootstrap badge for status */}
            {preferences?.notification_enabled ? "Enabled" : "Disabled"}
          </span>
        </p>
        <PreferencesForm
          current={preferences}
          onUpdate={() => window.location.reload()}
        />
      </motion.section>

      {/*Goals */}
      <motion.section className="card p-4 mb-4 shadow-sm" variants={fadeInUp}>
        <h2 className="card-title">Investment Goals</h2>
        {goals?.map((goal) => (
          <EditableGoalCard
            key={goal.goal_id}
            goal={goal}
            onGoalUpdated={() => window.location.reload()}
          />
        ))}
        <AddGoalForm onGoalAdded={() => window.location.reload()} />
      </motion.section>

      <motion.section className="card p-4 mb-4 shadow-sm" variants={fadeInUp}>
        <h2 className="card-title">Watchlist</h2>
        {watchlist?.length ? (
          <ul className="list-group list-group-flush">
            {watchlist.map((stock) => (
              <motion.li key={stock.stock_id} variants={fadeInUp} layout className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{stock.symbol}</strong> – {stock.company_name} ($
                  {stock.current_value})
                </span>
                <motion.button
                  className="btn btn-sm btn-danger ms-2" // Bootstrap button classes
                  onClick={async () => {
                    try {
                      await axios.post(API_ENDPOINTS.WATCHLIST_REMOVE, {
                        user_id: userId,
                        stock_id: stock.stock_id,
                      });
                      window.location.reload();
                    } catch {
                      alert("Failed to remove");
                    }
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: "#c0392b" }}
                  whileTap={{ scale: 0.9 }}
                >
                  Remove
                </motion.button>
                <TradeStockForm
                  stockId={stock.stock_id}
                  symbol={stock.symbol}
                  portfolios={portfolios}
                  onTrade={() => window.location.reload()}
                />
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No stocks in watchlist.</p>
        )}
      </motion.section>

      {/*Portfolios */}
      <motion.section className="card p-4 mb-4 shadow-sm" variants={fadeInUp}>
        <h2 className="card-title">Portfolios</h2>
        <AddPortfolioForm onAdded={() => window.location.reload()} />

        {portfolios?.map((p) => (
          <motion.div key={p.portfolio_id} className="card p-3 mt-3 border-primary" variants={fadeInUp} layout>
            <strong>{p.portfolio_name}</strong> (ID: {p.portfolio_id}) –
            Created: {new Date(p.created_date).toDateString()}
            <ul className="list-group list-group-flush mt-2">
              {holdings
                .filter((h) => h.portfolio_id === p.portfolio_id)
                .map((h) => (
                  <li key={h.stock_id} className="list-group-item">
                    {h.symbol} – {h.company_name}
                    <br />
                    Shares: {h.shares_owned}, Avg Price: $
                    {h.stock_average_price}, Current Value: ${h.current_value} →{" "}
                    <strong>Total: ${h.total_value}</strong>
                  </li>
                ))}
            </ul>
          </motion.div>
        ))}
      </motion.section>
      {/*Sector Breakdown */}
      {holdings?.length > 0 && <SectorChart holdings={holdings} />}
      <AvailableStockList onAdded={() => window.location.reload()} />
      <NewsFeed userId={userId} />
    </motion.div>
  );
};

export default DashboardPage;
