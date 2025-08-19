import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function MySnackbar({ open ,message}) {

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
            >
                <Alert severity="info"> {message}</Alert>
            </Snackbar>
        </div>
    );
}
