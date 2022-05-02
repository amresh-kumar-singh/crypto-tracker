import { Button, CircularProgress, createTheme, styled, ThemeProvider } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api'
import {CryptoState} from "../CryptoContext"
import { Chart as ChartJS, registerables } from 'chart.js';
import {  Line } from 'react-chartjs-2'
import { chartDays } from '../config/data';
ChartJS.register(...registerables);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const ContainerRoot = styled("div")(({theme}) => ({
    width:"75%",
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "25px",
    padding: "40px",
    [theme.breakpoints.down("md")] : {
        width: "100%",
        marginTop: 0,
        padding: "20px",
        paddingTop: 0,
    }
}))

const CoinInfo = ({ coin }) =>{
    const [historicData, setHistoricData] = useState()
    const [days, setDays] = useState(1)
    const {currency} = CryptoState()
// console.log("coin: id", historicData)

    useEffect(()=> {
        const fetchHistoricData = async () => {
            const { data } = await axios.get(HistoricalChart(coin?.id, days, currency))
            // console.log("daata",data)
            setHistoricData(data.prices)   
        }
      coin?.id &&  fetchHistoricData()
    },[days, currency, coin?.id])

    return(
        <ThemeProvider theme={darkTheme}>
            <ContainerRoot>
                {/* Charts */}
                {
                    !historicData ? (
                        <CircularProgress 
                            style={{color: "greenyellow"}}
                            thickness = {3.6}
                            size= {250}
                        />
                    ) : (
                        <>
                        <Line
                           data = {{
                               labels : historicData.map((coin) => {
                                //    console.log(coin[0])
                                    let date = new Date(coin[0])
                                    let time = date.getHours() > 12 ?(
                                        `${date.getHours()-12}: ${date.getMinutes()} PM`
                                    ) : (
                                        `${date.getHours()}:${date.getMinutes()} AM`
                                    )
                                    return days===1 ? time : date.toLocaleDateString()
                             }),
                                datasets: [{
                                    data: historicData.map((coin) => coin[1]),
                                    label: `Price (Past ${days} Days) in ${currency}`,
                                    borderColor:"#fff"
                                }]
                            }}
                            options= {{
                                elements: {
                                    point:{
                                        radius:1
                                    }
                                }
                            }}
                        
                        />
                        <div style={{display: "flex", marginTop:20, justifyContent:"space-around", width:"100%"}}>
                            {chartDays.map( day => {
                                // console.log("day: ", days.label)
                               return <Button 
                                     variant='outlined'
                                     key={day.label}
                                     disabled={days===day.value}
                                     onClick={() => setDays(day.value)}
                               >{day.label}</Button>
                            })}
                        </div>
                        </> 
                    )
                }
            </ContainerRoot>
        </ThemeProvider>
    )
}

export default CoinInfo