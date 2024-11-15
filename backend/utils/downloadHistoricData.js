const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const fetchData = async (ticker, days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const startDateTimestamp = Math.floor(startDate.getTime() / 1000);
    const endDateTimestamp = Math.floor(endDate.getTime() / 1000);
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?period1=${startDateTimestamp}&period2=${endDateTimestamp}&interval=1d`;
    
    try {
      const response = await axios.get(url);

      if (response.data.chart.result) {
        const result = response.data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];

        return timestamps.map((timestamp, index) => ({
          t: timestamp * 1000,
          o: quotes.open[index],
          h: quotes.high[index],
          l: quotes.low[index],
          c: quotes.close[index],
          v: quotes.volume[index],
        }));
      } else {
        console.error('No data found for the specified date range.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
};

const writeCsv = (data, ticker, days, callback) => {
  const historic_data_folder = './historic_data';
  if (!fs.existsSync(historic_data_folder)) {
    fs.mkdirSync(historic_data_folder);
  }

    const csvWriter = createCsvWriter({
      path: `./historic_data/${ticker}_stock_data_${days}.csv`,
      header: [
        { id: 't', title: 'Timestamp' },
        { id: 'o', title: 'Open' },
        { id: 'h', title: 'High' },
        { id: 'l', title: 'Low' },
        { id: 'c', title: 'Close' },
        { id: 'v', title: 'Volume' },
      ],
    });
  
    const records = data.map((item) => ({
      t: new Date(item.t).toISOString(),
      o: item.o,
      h: item.h,
      l: item.l,
      c: item.c,
      v: item.v,
    }));
  
    csvWriter
      .writeRecords(records)
      .then(() => {
        console.log('CSV file written successfully.')
        callback();
      });
};

const downloadHistoricData = async (ticker, days, callback) => {
    const data = await fetchData(ticker, days);

    if (data.length > 0) {
        writeCsv(data, ticker, days, callback);
    }
}

module.exports = downloadHistoricData;