import React from 'react';

export const WelcomeCard = ({ticker}) => {
    return(
        <div style={{width: 'fit-content', backgroundColor: '#1CBFC1', borderRadius: '10px'}}>
            <div style={{padding: '20px 20px 10px 20px', fontSize: '34px', fontWeight: 'bold'}}>Welcome!</div>
            <div style={{padding: '0px 20px 0px 20px', fontWeight: 'bold', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>Please select the ticker symbol to view both live and historical data. Additionally,</div>
            <div style={{padding: '0px 20px 20px 20px', fontWeight: 'bold'}}>specify the number of days for which you would like to see historical data</div>
        </div>
    );
}