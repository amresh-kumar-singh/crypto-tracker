import { Box, Button, TextField } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import {auth} from '../../firebase'

const SignUp = ({handleClose}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {setAlert} = CryptoState()

    const handleSubmit = async (e) => {
        if(password !== confirmPassword) {
            setAlert({
                open:true,
                type: "error",
                message:"Password do not match"
            })
            return;
        }
        try{
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(result)
            setAlert({
                open: true,
                type: "success",
                message: `User Created Successfully with ${result.user.email}`
            })
            handleClose()
        }catch(e) {
            setAlert({
                open: true,
                type: "error",
                message: e.message,
            })
        }
    }
    return (
        <Box p={3} sx={{display:"flex", flexDirection:"column", gap:"20px"}}>
            <TextField
                variant='outlined'
                type='email'
                label='Enter Email'
                fullWidth
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                variant='outlined'
                type='password'
                label='Enter Password'
                fullWidth
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                variant='outlined'
                type='password'
                label='Confirm Password'
                fullWidth
                value = {confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant='contained' onClick={handleSubmit} size="large">SignUp</Button>
                
        </Box>
    )
}

export default SignUp