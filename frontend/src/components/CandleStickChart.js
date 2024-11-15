import React from "react";
import Plot from 'react-plotly.js';

export const CandleStickChart = React.memo(({data, title}) => {
    let trace = {
        x: data.map(ticker => new Date(ticker['Timestamp']).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        })),
        close: data.map(ticker => ticker['Close']),
        high: data.map(ticker => ticker['High']),
        low: data.map(ticker => ticker['Low']),
        open: data.map(ticker => ticker['Open']),

        increasing: {line: {color: 'green'}},
        decreasing: {line: {color: 'red'}},

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    let layout = {
        font: {
            color: '#BDC6CC'
        },
        plot_bgcolor: '#0E0E23',
        paper_bgcolor: '#0E0E23',
        title: title,
        dragmode: 'zoom',
        showlegend: false,
        xaxis: {
          gridcolor: 'rgba(100, 100, 100, 0.5)',
          griddash: 'dashdot',
          nticks: 5,
          rangeslider: {
               visible: false
           }
        },
        yaxis: {
            gridcolor: 'rgba(100, 100, 100, 0.5)',
            griddash: 'dashdot',
        }
      };

    return (
        <div style={{flexBasis: '100%', height: '400px', borderRadius: '15px', border: '1px solid #0E0E23', overflow: 'hidden'}}>
            <Plot
                style={{height: '100%'}}
                data={[trace]}
                layout={layout}
            />
        </div>)
})