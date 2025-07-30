import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_ENDPOINTS } from "../config/api";
import { staggerContainer, fadeInUp } from "../animations/variants";

const NewsFeed = ({ userId }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const res = await axios.get(API_ENDPOINTS.USER_NEWS, {
        params: { userId },
      });
      setNews(res.data);
    };
    loadNews();
  }, [userId]);

  return (
    <motion.div
      className="card p-4 mb-4 shadow-sm" // Bootstrap card classes
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <h2 className="card-title mb-3">Market News</h2> {/* Bootstrap card title and margin-bottom */}
      {news.length ? (
        <motion.ul className="list-group list-group-flush"> {/* Bootstrap list group */}
          {news.map((n) => (
            <motion.li
              key={n.news_id}
              className="list-group-item" // Bootstrap list group item
              variants={fadeInUp}
            >
              <strong>{n.headline}</strong>
              <br />
              <span className="text-muted"> {/* Bootstrap text-muted */}
                {n.symbol} – {n.company_name}
                <br />
                {n.publication_date} | {n.news_source} | Impact:{" "}
                {n.impact_score}%
              </span>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-muted">No news available.</p> // Bootstrap text-muted
      )}
    </motion.div>
  );
};

export default NewsFeed;
