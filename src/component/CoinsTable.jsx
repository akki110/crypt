import React, { useEffect, useState } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import './coinstable.css';
import TextField from '@mui/material/TextField';
import { TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { numberWithCommas } from './Carousel';
import { useHistory } from 'react-router-use-history';

export const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { currency, symbol } = CryptoState();
    const history = useHistory();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const handleSearch = () => {
        return coins.filter(
            (coin) => 
                coin.name.toLowerCase().includes(search.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <div className='coins-container'>
            <h4 className='coins-title'>Prices of cryptocurrency by market capitalisation</h4>
            <TextField 
                id="outlined-basic" 
                className='search-box' 
                label="Search For Crypto Currency" 
                variant="outlined" 
                onChange={(e) => setSearch(e.target.value)} 
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'gold',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'gold',
                        },
                        color: 'gold',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'gold',
                    },
                }} 
            />
            <TableContainer style={{ maxWidth: "95%", borderRadius: "5px", margin: '30px auto' }} className='table-container'>
                {loading ? (
                    <LinearProgress style={{ backgroundColor: 'gold', marginTop:'50px' }} />
                ) : (
                    <Table>
                        <TableHead className='table-head'>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{ color: "black", fontWeight: "700", fontFamily: "Montserrat", fontSize:"20px" }}
                                        key={head}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                                .slice((page-1) * 10, (page-1) * 10 + 10)
                                .map((row) => {
                                const profit = row.price_change_percentage_24h > 0;

                                return (
                                    <TableRow
                                        onClick={() => history.push(`/coins/${row.id}`)}
                                        key={row.name}
                                        className='tablebody-row' 
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            style={{ display: 'flex', gap: 15 }}
                                        >
                                            <img
                                                src={row?.image}
                                                alt={row.name}
                                                height='50'
                                                style={{ marginBottom: 10, height:'50px', width:"50px" }}
                                            />
                                            <div>
                                                <span style={{ textTransform: 'uppercase', fontSize: 22, color:"gold", margin:'auto' }}>
                                                    {row.symbol}
                                                </span>
                                                <span style={{ color: 'darkgrey', marginLeft:"5px" }}>
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ color:'white' }}>
                                            {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {profit && '+'}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell style={{ color:'white' }}>
                                            {symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination
               count={Math.ceil(handleSearch()?.length / 10)}

                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'gold',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'gold',
                            color: 'black',
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: 'gold',
                        },
                        '& .MuiPaginationItem-ellipsis': {
                            borderColor: 'gold',
                        },
                    },
                }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </div>
    );
};
