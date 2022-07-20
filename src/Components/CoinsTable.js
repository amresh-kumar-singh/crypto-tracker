import React, { useState } from 'react'
import { Container,  LinearProgress, Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField,  Typography } from '@mui/material'
import { CryptoState } from '../CryptoContext'
import {  useNavigate } from 'react-router-dom'
import { StyledTableCell, StyledTableRow } from './StyledTable'



const CoinsTable = () => {
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const {symbol, local, coins,loading} = CryptoState() //we can receive fetch coin here but no need
    const navigate = useNavigate()

    const handleSearch = () => {
        return coins.filter(coin => coin?.name.toLowerCase().includes(search) || coin?.symbol.toLowerCase().includes(search))
    }
    return(
        // <ThemeProvider theme={darkTheme}>
            <Container sx ={{textAlign:"center"}}>
                <Typography 
                    variant='h4'
                    sx={{margin:2, fontFamily: "Lato"}}
                >
                    CryptoCurrency Prices by Market Cap
                </Typography>
                <TextField 
                    label= "Search for a Crypto Currency"
                    variant='outlined'
                    sx={{marginBottom:2, width:"100%"}}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {
                        loading ? (
                            <LinearProgress sx={{backgroundColor: "goldenrod"}} />
                        ) : (
                            <Table>
                                <TableHead >
                                    <TableRow>
                                        {["Coin", "Price", "24H Change", "Market Cap"].map( head => {
                                            return(
                                                <StyledTableCell 
                                                    // sx={{color:"black",fontFamily:"Lato",fontWeight:"700"}}
                                                    align={head==="Coin" ? "inherit": "right"}
                                                    key={head}
                                                >
                                                    {head}
                                                </StyledTableCell>
                                            )
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {handleSearch()
                                            .slice((page-1) * 10, (page-1) * 10 + 10)
                                            .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0
                                            return(
                                                <StyledTableRow
                                                    onClick = {() => navigate(`/coins/${row.id}`)}
                                                    key = {row.id}
                                                    sx={{cursor: "pointer"}}
                                                >
                                                    <StyledTableCell
                                                        component="th"
                                                        scope="row"
                                                        sx={{display:"flex", gap:4}}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row?.name}
                                                            height="50"
                                                            style={{marginBottom:15}}
                                                         />
                                                         <div style={{display:"flex",flexDirection:"column"}}>
                                                            <span style={{fontSize:22, textTransform:"uppercase"}}>
                                                                {row.symbol}
                                                            </span>
                                                            <span >
                                                                {row.name}
                                                            </span>
                                                         </div>
                                                    </StyledTableCell>
                                                    <StyledTableCell align='right'>
                                                        {symbol} {row.current_price.toLocaleString(local)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right" sx={{color: profit>0 ? "inherit":"red", fontWeight:500}}>
                                                        {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                      {symbol}  {row.market_cap.toLocaleString(local)}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                    sx={{padding: 4, width:"100%", display:"flex", flexDirection:'column', ul: {justifyContent:"center"}}}
                    count={Number((handleSearch()?.length/10).toFixed(0))}
                    onChange = {(e,value) => {
                        setPage(value)
                        window.scroll(0, 450)
                    }}
                    color="secondary"
                    variant="outlined"
                />
            </Container>
        /* </ThemeProvider> */
    )
}

export default CoinsTable