import React, { memo, FC } from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export interface SnackBarDataProps {
    msg?: string
    type?: 'success' | 'error' | 'info' | 'warning'
}

type SnackBarProps = SnackBarDataProps & SnackbarProps;

export const SnackBar: FC<SnackBarProps> = memo(
    ({ open, msg = '', type }) => (
        <Snackbar open={open} autoHideDuration={6000}>
            <MuiAlert elevation={6} variant="filled" severity={type}>
                {msg}
            </MuiAlert>
        </Snackbar>
    ),
);
