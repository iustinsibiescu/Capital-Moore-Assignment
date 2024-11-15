import React from "react";

export const TickerCardSelector = ({ticker, tickerSelector}) => {
    return (
        <div style={{flexGrow: '1', backgroundColor: '#0E0E23', padding: '20px', borderLeft: '5px solid #0E6EFD', borderRadius: '10px'}}>
          <div>TICKER</div>
          <div style={{padding: '20px 0 0 0', fontSize: '34px'}}>
          <select onChange={(ev) => tickerSelector(ev.target.value)} value={ticker} style={{backgroundColor: '#0E0E23'}}>
            <option value="AAPL">AAPL</option>
            <option value="META">META</option>
            <option value="MSFT">MSFT</option>
            <option value="TSLA">TSLA</option>
          </select>
          </div>
        </div>
    );
}