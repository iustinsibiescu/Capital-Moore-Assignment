import React from "react";
import Plot from 'react-plotly.js';

export const LiveChart = ({ data, title }) => {
    let layout = {
        font: {
            color: '#BDC6CC'
        },
        plot_bgcolor: '#0E0E23',
        paper_bgcolor: '#0E0E23',
        title: title,
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
                data={[
                {
                    x: data.map(point => point[0]),
                    y: data.map(point => point[1]),
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: '#0E6EFD'},
                },
                ]}
                layout={ layout }
            />
        </div>)
}