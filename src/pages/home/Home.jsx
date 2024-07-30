import React from 'react';
import { Banner } from '../../component/Banner';
import { CoinsTable } from '../../component/CoinsTable';
import './home.css';

export const Home = () => {
  return (
    <div className='container'>
    <Banner/>
    <CoinsTable />
    </div>
  )
}
