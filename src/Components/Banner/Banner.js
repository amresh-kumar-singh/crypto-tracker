import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const bannerStyle = {
    backgroundImage: 'url(./Banner.jpg)',
    backgroundSize: "contain",
    // backgroundRepeat: "no-repeat"
}
const bannerContentStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    paddingTop: "25px",
    justifyContent: "space-around"
}
const tagLineStyle = {
    display: "flex",
    height:"0%",
    flexDirection: "column",
    justifyContent:"center",
    textAlign: "center"
}

const Banner = () => {

    return(
        <>
            <Box sx={bannerStyle}>
                <Container sx={bannerContentStyle}>
                    <Box sx={tagLineStyle}>
                        <Typography variant="h2" sx={{color: "white",fontWeight:"bold", marginBottom:"14px", fontFamily:"Lato"}}>
                            Crypto Tracker
                        </Typography>
                        <Typography variant="subtitle2" sx={{color:"darkgray", textTransform:"capitalize", fontFamily:"Lato"}} >
                            Track you favorite crypto currency
                        </Typography>
                    </Box>
                    <Carousel />
                </Container>
            </Box>
        </>
    )
} 

export default Banner;