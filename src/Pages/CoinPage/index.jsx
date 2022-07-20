import {Button, styled, Typography } from '@mui/material';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import HTMLReactParser from 'html-react-parser';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CoinInfo from '../../Components/CoinInfo';
import { SingleCoin } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { db } from '../../firebase';
import { ContainerRoot, heading, MarketDataRoot, SidebarRoot } from './style';

const StyledButton = styled(Button)(({theme}) => ({
    width:"100%",
    [theme.breakpoints.down("md")] : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    [theme.breakpoints.down("sm")] : {
        flexDirection: "column",
        alignItems: "center"
    },
    [theme.breakpoints.down("xs")] : {
        alignItems: "start"
    }
}))
const CoinPage = () => {
    const {id} = useParams()
    const [coin, setCoin] = useState()
    const {symbol, currency, local, user, watchlist, setAlert} = CryptoState()
  
    useEffect(() => {
        const fetchCoinDetail = async () =>{
            const {data} = await axios.get(SingleCoin(id))
            setCoin(data)
        }
        fetchCoinDetail()
    },[id])
    // console.log("coin :", coin, id)
    
    const addToWatchlist = async () => {
        const coinDbRef = doc(db, "watchlist", user.uid)

        try{
            await setDoc( coinDbRef, {
                coins: watchlist ? [...watchlist, coin.id] : [coin.id]
            })
            setAlert({
                open: true,
                type: "success",
                message: `${coin.name} Added to Watchlist.`
            })
        } catch(e) {
            setAlert({
                open: true,
                type: "error",
                message: e.message
            })
        }
    }

    const removeFromWatchList = async () => {
        const coinDbRef = doc(db, "watchlist", user.uid)

        try{
            await setDoc( coinDbRef, {
                coins: watchlist.filter( watch => coin.id !== watch )
            },
            {merge: true}
            )
            setAlert({
                open: true,
                type: "info",
                message: `${coin.name} Removed from Watchlist.`
            })
        } catch(e) {
            setAlert({
                open: true,
                type: "error",
                message: e.message
            })
        }
    }
    const inWatchlist = watchlist.includes(coin?.id)
    // console.log(watchlist)
    return (
        <ContainerRoot >
            <SidebarRoot >
                <img
                    src= {coin?.image.large}
                    alt={coin?.name}
                    height="200px"
                    style={{marginBottom:20}}
                /> 
                <Typography variant='h3' sx={heading}>
                    {coin?.name}
                </Typography>
                <Typography variant='subtitle2' sx={{width:"100%", fontFamily:"Lato",padding:"25px", paddingBottom:"15px", paddingTop:0, textAlign:"justify"}}>
                    {HTMLReactParser(String(coin?.description.en.split("\n")[0]), {
                        replace: node => {
                            if(node.name==="a") {
                                return node.children
                            }
                        }
                    })}
                </Typography>
                <MarketDataRoot>
                    <span style={{display:"flex"}}>
                        <Typography variant='h6' sx={heading} >
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='subtitle1'sx={{fontFamily:"Lato"}}>
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{display:"flex"}} >
                        <Typography variant='h6' sx={heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='subtitle1'sx={{fontFamily:"Lato"}}>
                          {symbol}  {coin?.market_data.current_price[currency.toLowerCase()].toLocaleString(local)}
                        </Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant='h6'  sx={heading}>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant='subtitle1'sx={{fontFamily:"Lato"}}>
                          {symbol}  {coin?.market_data.market_cap[currency.toLowerCase()].toLocaleString(local).slice(0, -7)}M
                        </Typography>
                    </span>
              {user &&      <StyledButton variant="outlined" 
                                  onClick={inWatchlist? removeFromWatchList : addToWatchlist} 
                                  sx={{color: inWatchlist? "red": ""}}>
                      {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                    </StyledButton>}
                </MarketDataRoot>
            </SidebarRoot>
            <CoinInfo coin={coin} />
        </ContainerRoot>
    )
}

export default CoinPage;