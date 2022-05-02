import React, { createContext, useContext, useEffect, useState } from "react"

const Crypto = createContext()

const CryptoContext = ({children}) => {

    const [currency, setCurrency] = useState("INR")
    const [symbol, setSymbol] = useState("₹")
    const [local, setLocal] = useState("en-IN")

    useEffect(() => {
        if(currency == "INR") {
            setSymbol("₹")
            setLocal("en-IN")
        } else {
            setSymbol("$")
            setLocal("en-US")
        }
    },[currency])

    return(
        <Crypto.Provider value={{currency, symbol, setCurrency, local}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}