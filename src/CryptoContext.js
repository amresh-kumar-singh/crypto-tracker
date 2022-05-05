import axios from "axios"
import { onAuthStateChanged } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { CoinList } from "./config/api"
import { auth, db } from "./firebase"

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")
    const [local, setLocal] = useState("en-IN")
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    const [alert, setAlert] = useState({
        open: false,
        type: "success",
        message: "",
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(user) setUser(user);
            else setUser(null)
        })
    },[])

    //check snapshot in db firebase
    useEffect(() => {
        let unsubcribe;
        if(user) {
            const coinDbRef = doc(db, "watchlist", user?.uid)
             unsubcribe = onSnapshot(coinDbRef, coin => {
                console.log("coin: ", coin)
                if(coin?.exists()) {
                    setWatchlist(coin.data().coins)
                } else {
                    console.log("coin does not exits in DB")
                }
            })

            return () => {
                 unsubcribe()
            }
        }
    },[user])
console.log("watchlist: ", watchlist)
    useEffect(() => {
        if(currency == "INR") {
            setSymbol("₹")
            setLocal("en-IN")
        } else {
            setSymbol("$")
            setLocal("en-US")
        }
    },[currency])
    const fetchCoinsMemo = useMemo( async () => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
        // console.log("data :", data)
    },[currency])
    // fetchCoinsMemo() will return data

    return(
        <Crypto.Provider value={{currency, user, symbol, setCurrency, local, coins, loading, fetchCoinsMemo, alert, setAlert, watchlist, setWatchlist}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}