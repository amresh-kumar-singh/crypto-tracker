import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Avatar, Container } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { doc, setDoc } from 'firebase/firestore';

const watchlistStyle = {
    flex:1,
    borderRadius:"10px",
    width: "100%",
    backgroundColor:"grey",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: '12px',
    overflow: "scroll"
}

export default function UserSideBar() {
    const {user, setAlert, watchlist, coins,symbol, local} = CryptoState()
    const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleLogout=() => {
    signOut(auth)
    setAlert({
        open:true,
        type: "success",
        message: "Logged Out Successfully"
    })
  }

  const removeFromWatchList = async (coin) => {
    const coinDbRef = doc(db, "watchlist", user.uid)

    try{
        await setDoc( coinDbRef, {
            coins: watchlist.filter( watch => coin.id !== watch )
        },
        {merge: true}
        )
        setAlert({
            open: true,
            type: "info",
            message: `${coin.name} Removed from Watchlist.`
        })
    } catch(e) {
        setAlert({
            open: true,
            type: "error",
            message: e.message
        })
    }
}

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)} 
                  sx={{height:"38px", width:"38px", cursor:"pointer", marginLeft:"15px"}}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
            />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container sx={{width: "350px", height:"100%", padding:"20px", display:"flex", flexDirection:"column"}}>
                <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", height:'92%'}}>
                    <Avatar src={user.photoURL} sx={{width:200, height:200, objectFit:'contained'}}  />
                    <span style={{width: "100%", textAlign:"center", fontWeight:"bolder", wordWrap:"break-word"}}>{user.displayName || user.email}</span>
                    <Box sx={watchlistStyle}>
                        <span style={{fontSize:"15px", textShadow:"0 0 5px black"}}>
                            Watchlist
                        </span>

                          {coins.map(coin => {
                            if(watchlist.includes(coin.id)) {
                              return (
                                <Box key = {coin.name} sx={{display:"flex",width:"100%", justifyContent:"space-between",padding:"5px 10px", borderRadius:"5px", boxShadow:"0 0 3px black"}}>
                                  <span>{coin.name}</span>
                                  <span>{symbol} {(coin.current_price).toLocaleString(local)}</span>
                                  <span><DeleteOutlineIcon 
                                            sx={{cursor: "pointer"}}
                                            onClick= {() => removeFromWatchList(coin)}
                                        />
                                  </span>
                                </Box>
                              )
                            }
                          })}
                        
                    </Box>
                </div>
                <Button variant='contained' onClick={handleLogout}>
                    Logout
                </Button>
            </Container>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
