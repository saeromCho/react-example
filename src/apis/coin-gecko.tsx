import axiosInstance from "./axios-instance";

export const checkPing = async () => {
  try {
    const response = await axiosInstance.get('/ping');
    return response.data;
  } catch ( error) {
    console.error('Failed to fetch ping:', error);
    throw error;
  }
}

export const fetchCoins = async (currency = 'usd', order = 'market_cap_desc', per_page = 100, page = 1, sparkline = false) => {
  try {
    const response = await axiosInstance.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: order,
        per_page: per_page,
        page: page,
        sparkline: sparkline,
      },
    });
    return response.data;
  } catch ( error) {
    console.error('Failed to fetch coins:', error);
    throw error;
  }
};