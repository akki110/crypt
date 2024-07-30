import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { SingleCoin } from "../../config/api";
import axios from "axios";
import { LinearProgress } from "@mui/material";
import { CoinInfo } from "../../component/CoinInfo"; // Assuming this is the correct import path
import "./coin.css";
import { numberWithCommas } from "../../component/Carousel";

export const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  console.log(coin);

  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold", marginTop: "50px" }} />
    );

  return (
    <div className="coin-container">
      <div className="sidebar">
        <img
        className="coin-img"
          src={coin?.image.large}
          alt={coin?.name}
        />
        <h3 className="coin-name">{coin?.name}</h3>
        <p className="coin-description">{coin?.description.en.split(". ")[0]}</p>
        <span className="coin-details">  
          <h5>Rank: {coin?.market_cap_rank}</h5>
          <h5>Current Price :{" "} {symbol} {" "} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()].toFixed(2))}</h5>
          <h5>Market Cap : {" "} 
            {symbol} {" "} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}</h5>
        </span>

      </div>
      <div className="chart">
      <CoinInfo coin={coin} />
      </div>
    </div>
  );
};
