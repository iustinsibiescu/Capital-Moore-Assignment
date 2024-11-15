import React from "react";

export const TickerCard = ({ticker, price, lastClosingPrice}) => {
    let priceDiff = (parseFloat(price) - parseFloat(lastClosingPrice)).toFixed(2);
    let percentageChange = (parseFloat(price) / parseFloat(lastClosingPrice) * 100 - 100).toFixed(2);
    percentageChange = isFinite(percentageChange) ? percentageChange : '+0';
    priceDiff = priceDiff >= 0 ? '+' + priceDiff : priceDiff;
    percentageChange = percentageChange > 0 ? '+' + percentageChange : percentageChange;

    return (
        <div style={{height: 'fit-content' ,width: '500px', background: '#0E0E23', borderRadius: '10px'}}>
            <div style={{fontSize: '28px', borderBottom: '1px solid #343C43', padding: '10px'}}>{ticker}</div>
            <div style={{textAlign: 'center', padding: '10px 10px 10px 10px'}}><span style={{fontSize: '34px'}}>{price}</span> USD</div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px 20px 10px 20px', borderBottom: '1px solid #343C43'}}>
                <div style={{color: priceDiff < 0 ? 'red' : 'green', fontSize: '18px'}}>
                    {priceDiff}({percentageChange}%)
                </div>
                <button onClick={() => window.location.replace(`https://robinhood.com/us/en/stocks/${ticker}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded">Buy {ticker}</button>
            </div>
            <div style={{padding: '10px 20px 10px 20px'}}>
                { new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </div>
        </div>
    )
}