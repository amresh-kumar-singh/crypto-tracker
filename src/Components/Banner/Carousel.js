import React, { useEffect, useState } from "react";
import { Box, rgbToHex } from "@mui/material";
import axios from 'axios'
import {TrendingCoins} from '../../config/api.js'
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const carouseStyle = {
    height: "60%",
    display: "flex",
    alignItems: "center"
}
const responsive = {
    0: {
        items:2
    },
    512: {
        items:4
    }
}
const carouselItemStyle = {
    display: "flex",
    color: "whitesmoke",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase"
}
const Carousel = () => {
    const [trending, setTrending] = useState([])
    const {currency, symbol, local}= CryptoState()

    const fetchTrencingCoins = async () => {
        const {data} = await axios(TrendingCoins(currency))//try in useCallback
        setTrending(data)
    }
    useEffect(()=>{
        fetchTrencingCoins()
    },[currency])
    console.log(trending)
    //=========================================items component=======================================
    const items = trending.map( coin => {
        const profit = coin?.price_change_percentage_24h >= 0;
        return (
            <Link to={`/coins/${coin.id}`} style={{...carouselItemStyle}}>
                <img
                    src={coin?.image}
                    alt={coin?.name}
                    height="80px"
                    style={{marginBottom: 10}}
                />
                <span>
                    {coin?.symbol}
                </span>
                &nbsp;
                <span style={{color: profit > 0 ? "rgb(14,203,29)" : "red", fontWeight:500}}>
                    {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
                <span style={{fontSize:22, fontWeight:400}}>
                    {symbol} {(coin?.current_price)?.toLocaleString(local)}
                </span>
            </Link>
        )
    })

    return (
        <Box sx={carouseStyle}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </Box>
    )
}

export default Carousel;