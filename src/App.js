import { Box, createTheme, Paper, ThemeProvider, useTheme } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinPage from './Pages/CoinPage';
import HomePage from './Pages/HomePage';
import {useMemo, useState} from 'react'
import { amber, deepOrange, green, grey } from '@mui/material/colors';
import Alert from './Components/Alert';

const appStyle ={
    // backgroundColor: "inherit",
    // color: "white",
    minHeight:"100vh"
  }
const getDesignToken = (mode) => ({
  palette: {
    mode,
    primary:{
      ...amber,
      ...(mode==="dark" && {
        main: amber[300]
      }),
    },
    ...(mode === "dark" && ({
      background: {
        default: "#14161a",
        paper: "#14161a"
      }
    })),
    // ...(mode === "light" && {
    //   hover: {
    //     "&:hover": {
    //       backgroundColor: "rgba(0, 0, 0, 0.5)"
    //     }
    //   }
    // }),
    text:{
      ...(mode === "light" ? ({
        primary: grey[900],
        secondary: grey[800]
      }) : ({
        primary: "#fff",
        secondary: grey[500]
      }))
    }
  }
})

function App() {
  const [mode, setMode] = useState("light")
  const themeMode = useMemo(() =>{
   return createTheme(getDesignToken(mode))
  },[mode])

  return (
        <Router>
          <ThemeProvider theme={themeMode}>
            <Paper sx={appStyle}>
              <Header setMode={setMode} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/coins/:id" element = {<CoinPage />} />
              </Routes>
            </Paper>
            <Alert />
          </ThemeProvider>
        </Router>
  );
}

export default App;
