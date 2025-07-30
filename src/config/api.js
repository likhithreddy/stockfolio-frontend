// API Configuration with Environment Variable Priority
// Priority: Environment variables → localhost fallback

const getApiBaseUrl = () => {
  // Production: Use environment variable from Netlify
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Development: Default to localhost
  return "http://localhost:8080";
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to construct full API endpoints
export const getApiEndpoint = (path) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
};

// Export commonly used endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: getApiEndpoint("login"),
  REGISTER: getApiEndpoint("register"),

  // User endpoints
  USER_DASHBOARD: getApiEndpoint("user/dashboard"),
  USER_NEWS: getApiEndpoint("user/news"),
  PREFERENCES: getApiEndpoint("preferences"),

  // Stock endpoints
  STOCK_ALL: getApiEndpoint("stock/all"),

  // Watchlist endpoints
  WATCHLIST_ADD: getApiEndpoint("watchlist/add"),
  WATCHLIST_REMOVE: getApiEndpoint("watchlist/remove"),

  // Trading endpoints
  TRADE: getApiEndpoint("trade"),

  // Goal endpoints
  GOAL: getApiEndpoint("goal"),
  GOAL_DELETE: (goalId) => getApiEndpoint(`goal/${goalId}`),

  // Portfolio endpoints
  PORTFOLIO: getApiEndpoint("portfolio"),

  // Funds endpoints
  FUNDS_UPDATE: getApiEndpoint("funds/update"),

  // Admin endpoints
  ADMIN_ADD_STOCK: getApiEndpoint("admin/add-stock"),
  ADMIN_ADD_EXCHANGE: getApiEndpoint("admin/add-exchange"),
  ADMIN_UPDATE_KYC: getApiEndpoint("admin/update-kyc"),
  ADMIN_UPDATE_PRICE_HISTORY: getApiEndpoint("admin/update-price-history"),
  ADMIN_ADD_MARKET_NEWS: getApiEndpoint("admin/add-market-news"),
  ADMIN_USERS: getApiEndpoint("admin/users"),
  ADMIN_APPROVE_KYC: getApiEndpoint("admin/approve-kyc"),
  ADMIN_REVOKE_KYC: getApiEndpoint("admin/revoke-kyc"),
  ADMIN_STOCKS: getApiEndpoint("admin/stocks"),
  ADMIN_STOCKS_UPDATE_PRICE: getApiEndpoint("admin/stocks/update-price"),
  ADMIN_STOCK_EXCHANGES: getApiEndpoint("admin/stock-exchanges"),
  ADMIN_NEWS_ALL: getApiEndpoint("admin/news/all"),
};

// Environment info
console.log("API Configuration:", {
  baseUrl: API_BASE_URL,
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
});
