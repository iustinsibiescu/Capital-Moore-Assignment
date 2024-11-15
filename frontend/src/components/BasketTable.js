import React from "react";

export const BasketTable = ({tickerName}) => {
    return(
        <div style={{backgroundColor: '#0E0E23', flexGrow: '1', borderRadius: '10px'}}>
          <div style={{fontSize: '28px', borderBottom: '1px solid #343C43', padding: '10px 20px 10px 10px'}}>Basket</div>
          <table>
            <tr>
              <th></th>
              <th>Ticker</th>
              <th>Long Name</th>
              <th>Shares</th>
              <th>Price</th>
              <th></th>
            </tr>
            <tr style={{backgroundColor: tickerName === 'AAPL' ? '#0E6EFD' : '#0E0E23'}}>
              <td></td>
              <td>AAPL</td>
              <td>Apple Inc.</td>
              <td>134</td>
              <td>228.22$</td>
              <td></td>
            </tr>
            <tr style={{backgroundColor: tickerName === 'META' ? '#0E6EFD' : '#0E0E23'}}>
              <td></td>
              <td>META</td>
              <td>Meta Platforms Inc.</td>
              <td>102</td>
              <td>577.16$</td>
              <td></td>
            </tr>
            <tr style={{backgroundColor: tickerName === 'MSFT' ? '#0E6EFD' : '#0E0E23'}}>
              <td></td>
              <td>MSFT</td>
              <td>Microsoft Corp</td>
              <td>275</td>
              <td>426.89$</td>
              <td></td>
            </tr>
            <tr style={{backgroundColor: tickerName === 'TSLA' ? '#0E6EFD' : '#0E0E23'}}>
              <td style={{borderBottomColor: '#33334A'}}></td>
              <td>TSLA</td>
              <td>Tesla Inc.</td>
              <td>244</td>
              <td>311.18$</td>
              <td style={{borderBottomColor: '#33334A'}}></td>
            </tr>
          </table>
        </div>
    );
}