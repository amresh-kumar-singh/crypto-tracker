import React from 'react'
import { AppBar, Container, IconButton, MenuItem, Select, Toolbar, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Brightness4Rounded } from '@mui/icons-material';
import { CryptoState } from '../CryptoContext';
import { Brightness7Rounded } from '@mui/icons-material';
import AuthModal from './Authentication/AuthModal';
import UserSideBar from './Authentication/UserSideBar';

const titleStyle = {
    flex: 1,
    fontFamily: "Lato",
    fontWeight: "bold",
    cursor: "pointer",
    width:"30%"
}

const Header = ({setMode}) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const {currency, setCurrency, user} = CryptoState()
    // console.log(theme.palette.mode)
    // console.log(user)
    const handleModeChange = () => {
        setMode(prevMode => prevMode==="dark" ? "light" : "dark")
    }
    return (
            <AppBar  position='static'>
                <Container>
                    <Toolbar>
                        <Typography sx={titleStyle} onClick={() => navigate('/')} >Crypto Tracker</Typography>
                        <Select 
                            variant='outlined' 
                            value={currency} 
                            sx={{width:100, height:40, marginRight:{sm:"15px", xs:"2px"}}}
                            onChange ={(e) => setCurrency(e.target.value)}
                            >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        <IconButton sx={{ml:1}} onClick= {handleModeChange}>
                            {theme.palette.mode === "dark" ? <Brightness7Rounded /> : <Brightness4Rounded />}
                        </IconButton>
                        { user ? <UserSideBar /> :<AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
    )
}

export default Header;