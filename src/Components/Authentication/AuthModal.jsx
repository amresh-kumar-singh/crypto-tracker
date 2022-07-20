import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "12px"
};

const googleProvider = new GoogleAuthProvider()

export default function BasicModal() {
  const {setAlert} = CryptoState()
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider).then( res => {
        setAlert({
          open: true,
          type: "success",
          message: `SignUp successfully. Welcome ${res.user.displayName || res.user.email}`
        })
      }).catch(e => {
        setAlert({
          open: true,
          type:"error",
          message:e.message,
        })
      })
  }

  return (
    <div>
      <Button variant='outlined' color='secondary' sx={{ml: 1}} onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar position='fixed' sx={{borderRadius: "10px"}}>
                <Tabs variant='fullWidth' value={value} onChange = {handleChange}  >
                    <Tab label="Login" value={0} />
                    <Tab label="Sign Up" value={1} />
                </Tabs>
          </AppBar> 
          {value === 0 && <Login handleClose={handleClose} />} 
          {value === 1 && <SignUp handleClose = {handleClose} />} 
          {/* Google login */}
          <Box sx={{display:"flex", flexDirection:"column", textAlign:"center", padding:"24px", paddingTop:0, gap:"20px", fontSize:20}}>
            <span>OR</span>
            <GoogleButton style={{width:"100%", outline:"none"}} onClick={signInWithGoogle} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
