import React from 'react'
import { AppBar, Container, createTheme, IconButton, MenuItem, Select, ThemeProvider, Toolbar, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { Brightness4Rounded } from '@mui/icons-material';
import { Brightness7Rounded } from '@mui/icons-material';

const titleStyle = {
    flex: 1,
    fontFamily: "Lato",
    fontWeight: "bold",
    cursor: "pointer"
}
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Header = ({setMode}) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const {currency, symbol, setCurrency} = CryptoState()
    console.log(theme.palette.mode)

    const handleModeChange = () => {
        setMode(prevMode => prevMode==="dark" ? "light" : "dark")
    }
    return (
        // <ThemeProvider theme={darkTheme}>color='transparent'
            <AppBar  position='static'>
                <Container>
                    <Toolbar>
                        <Typography sx={titleStyle} onClick={() => navigate('/')} >Crypto Tracker</Typography>
                        <Select 
                            variant='outlined' 
                            value={currency} 
                            sx={{width:100, height:40, marginRight:15}}
                            onChange ={(e) => setCurrency(e.target.value)}
                            >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        <IconButton sx={{ml:1}} onClick= {handleModeChange}>
                            {theme.palette.mode === "dark" ? <Brightness7Rounded /> : <Brightness4Rounded />}
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        // </ThemeProvider>
    )
}

export default Header;