import React, { FC, memo } from 'react';
import './Popup.css';

import { ComponentCommonProps, FnActionProps } from 'client/shared/types';
import bem from 'bem-cn';
import Modal from '@material-ui/core/Modal';
import { Fade } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { Paper } from '../Paper';

interface PopupProps extends ComponentCommonProps {
    isVisible: boolean
    onChangeVisible?: FnActionProps
    title?: string
}

const block = bem('popup');

export const Popup: FC<PopupProps> = memo(
    ({
        className,
        isVisible,
        onChangeVisible,
        children,
        title,
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
                <Paper
                    title={title}
                    sizes="small"
                    className={block('body')}
                >
                    <div className={block('close')}>
                        <CloseIcon
                            onClick={onChangeVisible}
                        />
                    </div>
                    {children}
                </Paper>
            </Fade>
        </Modal>
    ),
);
