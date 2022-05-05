import { Snackbar } from '@mui/material';
import React from 'react' 
import { CryptoState } from '../CryptoContext';

import MuiAlert from '@mui/material/Alert';

// const Alert1 = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
const Alert = () => {
    const {alert, setAlert}=CryptoState()

    const handleClose = (event , reason) => {
        if(reason === "clickaway") {
            return
        }
        setAlert({open: false})
    }

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <MuiAlert
                onClose={handleClose}
                severity={alert.type}
                elevation={6}
                variant="filled"
            >{alert.message}</MuiAlert>
        </Snackbar>
    )
}

export default Alert;