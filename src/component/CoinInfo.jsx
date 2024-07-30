import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import './coinInfo.css';
import { chartDays } from '../config/data';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


export const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  console.log(historicData);

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  return (
    <div className="container">
      <div className="chart-coin">
        {!historicData ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <Line 
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time = date.getHours() > 12 
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM` 
                  : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [{
                label: `Price (Past ${days} Days) in ${currency}`,
                data: historicData.map((coin) => coin[1]),
                borderColor: '#EEBC1D',
                
              }],
            }} 
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
      </div>
      <div className="days-button">
        {chartDays.map(day => (
          <button className='btn-day' key={day.value} onClick={() => setDays(day.value)}>
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};
