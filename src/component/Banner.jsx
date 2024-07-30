import React  from 'react';
import './banner.css';
import Img from '../assets/banner.jpg'
import { Carousel } from './Carousel';



export const Banner = () => {

  return (
    <div className='baner-container'>
        <img src={Img} alt='img'/>
        <h1 className='banner-title'>CRYPT</h1>
        <p className='banner-text'>Get All the Information About Your Favourite Cryptocurrency</p>
        <Carousel/>
    </div>
  );
};
