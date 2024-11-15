import React from "react";

export const DaysCardSelector = ({days, daysSelector}) => {
    return (
        <div style={{flexGrow: '1', backgroundColor: '#0E0E23', padding: '20px', borderLeft: '5px solid #198754', borderRadius: '10px'}}>
          <div>NR. OF DAYS</div>
          <div style={{padding: '20px 0 0 0', fontSize: '34px'}}>
            <select onChange={(ev) => daysSelector(parseInt(ev.target.value))} value={days} style={{backgroundColor: '#0E0E23'}}>
              <option value="360">360</option>
              <option value="180">180</option>
              <option value="90">90</option>
              <option value="30">30</option>
          </select>
          </div>
        </div>
    );
}