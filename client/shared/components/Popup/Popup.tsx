import React, { FC, memo } from 'react';
import './Popup.css';

import { ComponentCommonProps, FnActionProps } from 'client/shared/types';
import bem from 'bem-cn';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { Paper } from '../Paper';

interface PopupProps extends ComponentCommonProps {
    isVisible: boolean
    onChangeVisible?: FnActionProps
}

const block = bem('popup');

export const Popup: FC<PopupProps> = memo(
    ({
        className,
        isVisible,
        onChangeVisible,
        children,
    }) => (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={block({}).mix(className).toString()}
            open={isVisible}
            onClose={onChangeVisible}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isVisible}>
                <Paper sizes="small" className={block('body')}>
                    {children}
                </Paper>
            </Fade>
        </Modal>
    ),
);
