import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { MenuItem, Select } from '@mui/material';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  // const [currency, setCurrency] = useState('INR');

  const {currency, setCurrency} = CryptoState();
  console.log(currency);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className='header-main'>
      <div className="nav-contain">
        <h1 className='title'>CRYPT</h1>
        <ul className='navbar-menu'>
          <li>
            <Link to="/" className='menu-item'>Home</Link>
          </li>
          <li>
            <Link to="News" className='menu-item'>News</Link>
          </li>
          <li>
            <Select
              value={currency}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select currency' }}
              className='select-currency'
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                },
                '& .MuiMenuItem-root': {
                  color: 'white',
                }
              }}

            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
