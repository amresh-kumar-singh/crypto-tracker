import { styled } from "@mui/material"

export const MarketDataRoot = styled('div')(({theme}) => ({
    alignSelf:"start",
    padding: "25px",
    paddingTop: "10px",
    //making it responsive
    [theme.breakpoints.down("md")] : {
        display: "flex",
        justifyContent: "space-around",
        width:"100%"
    },
    [theme.breakpoints.down("sm")] : {
        flexDirection: "column",
        alignItems: "center"
    },
    [theme.breakpoints.down("xs")]: {
        alignItems:"start"
    }
}))

export const ContainerRoot = styled('div')(({theme}) => ({
    display: "flex",
    [theme.breakpoints.down("md")] : {
        flexDirection: "column",
        alignItems: "center"
    }
}))

export const SidebarRoot = styled('div')(({theme}) => ({
    width:"30%", 
    [theme.breakpoints.down("md")] : {
        width: "100%"
    },
    display:"flex",
    flexDirection:"column", 
    alignItems:"center", 
    margin:"25px", 
    borderRight: "2px solid grey"}))

export const heading= {
    fontWeight:"bold",
     fontFamily:"Lato",
      marginBottom:"10px"
    }