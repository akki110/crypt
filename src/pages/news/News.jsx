import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NewsAPI } from '../../config/api';
import { LinearProgress } from '@mui/material';
import './news.css';

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get(NewsAPI());
      setNews(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching News', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <LinearProgress style={{ backgroundColor: 'gold', marginTop:'50px' }} />;
  }

  return (
    <div className='news-container'>
      <h1>Crypto Currency News</h1>
      {news.map((article, index) => (
        <div key={index} className='news-detail'>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target='_blank' rel='noopener noreferrer'>Read More...</a>
        </div>
      ))}
    </div>
  );
};
