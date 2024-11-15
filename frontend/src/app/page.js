"use client";
import React, { useState, useEffect } from "react";
import { getHistoricMarketData } from "../../api/getHistoricMarketData";
import { getLiveMarketDataWS } from "../../api/getLiveMarketDataWS";
import { CandleStickChart } from '../components/CandleStickChart';
import Navbar from "../components/Navbar";
import { TickerCard } from "@/components/TickerCard";
import { WelcomeCard } from "@/components/WelcomeCard";
import "./basket.css";
import { LiveChart } from "@/components/LiveChart";
import { backendStreamingUrl } from "../../api/constants";
import { TickerCardSelector } from "@/components/TickerCardSelector";
import { DaysCardSelector } from "@/components/DaysCardSelector";
import { BasketTable } from "@/components/BasketTable";


export default function Home() {
  const [tickerHistoricData, setTickerHistoricData] = useState([]);
  const [tickerName, setTickerName] = useState('AAPL');
  const [historicDaysRange, setHistoricDaysRange] = useState(360);
  const [realTimePrice, setRealTimePrice] = useState(0);
  const [realTimePoints, setRealTimePoints] = useState([]);

  useEffect(() => {
    getHistoricMarketData(tickerName, historicDaysRange).then(results => {
      if(results === undefined || results === null) results = [];
      setTickerHistoricData(results);
    });
  }, [tickerName, historicDaysRange]);

  useEffect(() => {
    const socket = new WebSocket(backendStreamingUrl);
    getLiveMarketDataWS(socket, tickerName, setRealTimePrice, setRealTimePoints);
    return () => socket.close();
  }, [tickerName, setRealTimePrice, setRealTimePoints])

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
      <Navbar />
      <div style={{display: 'flex', gap: '10px', margin: '0 20px 0 20px'}}>
        <WelcomeCard />
        <TickerCardSelector ticker={tickerName} tickerSelector={setTickerName} />
        <DaysCardSelector days={historicDaysRange} daysSelector={setHistoricDaysRange} />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: '20px', padding: '0px 20px 0px 20px'}}>
        <LiveChart data={realTimePoints} title={`${tickerName} - Live Tracker`}/>
        <CandleStickChart title={`${tickerName} - ${historicDaysRange} days`} data={tickerHistoricData} />
      </div>
      <div style={{display: 'flex', margin: '0 20px 0 20px', gap: '10px'}}>
        <TickerCard ticker={tickerName} price={realTimePrice} lastClosingPrice={tickerHistoricData?.[tickerHistoricData.length - 1]?.['Close'] ?? 0} />
        <BasketTable tickerName={tickerName} />
      </div>
    </div>
  );
}
