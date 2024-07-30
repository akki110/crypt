import React, { useEffect, useState } from 'react';
import './carousel.css';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { TrendingCoins } from '../config/api';
import AliceCarousel, { Link } from 'react-alice-carousel';



export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})*(?!\d))/g, ",");
};


export const Carousel = () => {
    const [trending, setTrending] = useState([]);
    
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    console.log(trending);
    
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

       return (
        <Link className='carouselItem' to={`/coins/${coin.id}`} >
            <img
            src={coin?.image}
            alt={coin.name}
            // height="10"
            style={{marginBottom:10, height:'80px', width: '80px', marginTop:'50px'}} 
            />
             <span className='carousel-symbol'>{coin?.symbol}
                &nbsp;
                <span className='carousel-profit'
                style={{
                    color: profit > 0 ? "rgb(14,203,129)" : "red",
                    fontWeight:500, 
                }}
                >{profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
            </span>
            <span className='carousel-price' style={{fontSize:22, fontWeight:500}}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>
       ); 
    });

    const responsive = {
        0:{
            items: 2,
        },
        512: {
            items: 4,
        },

    };

    return (
        
        <div className='carousel-container'>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={2000}
                animationDuration={2000}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
           
        </div>
    );
};