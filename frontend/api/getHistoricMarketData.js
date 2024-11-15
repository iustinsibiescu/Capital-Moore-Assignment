import axios from "axios";
import { backendUrl } from "./constants";

export const getHistoricMarketData = async (tickerName, historicDaysRange) => {
  try {
    const response = await axios.get(backendUrl + '/historicData', {
      params: {
        ticker: tickerName,
        days: historicDaysRange
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
