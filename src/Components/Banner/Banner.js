import { Box, Container, Grid, styled, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const bannerStyle = {
  backgroundImage: "url(./Banner.webp)",
  backgroundSize: "contain",
  // backgroundRepeat: "no-repeat"
};
const bannerContentStyle = {
  height: { md: "400px", xs: "300px" }, //300--722
  display: "flex",
  flexDirection: "column",
  paddingTop: "25px",
  justifyContent: "space-around",
};
const tagLineStyle = {
  display: "flex",
  height: "0%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};

const StyleTypography = styled(Typography)(({ theme }) => ({
  // fontSize:"3rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "20px",
  },
}));

const Banner = () => {
  return (
    <>
      <Box sx={bannerStyle}>
        <Container sx={bannerContentStyle}>
          <Grid sx={tagLineStyle}>
            <StyleTypography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: "14px",
                fontFamily: "Lato",
              }}
            >
              Crypto Tracker
            </StyleTypography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "darkgray",
                textTransform: "capitalize",
                fontFamily: "Lato",
              }}
            >
              Track you favorite crypto currency
            </Typography>
          </Grid>
          <Carousel />
        </Container>
      </Box>
    </>
  );
};

export default Banner;
