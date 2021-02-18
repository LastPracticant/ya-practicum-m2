import React from 'react';
import { Avatar, InputProps } from '@material-ui/core';
import './InputAvatar.css';

export interface InputAvatarProps extends InputProps {
    name: string;
    src?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputAvatarComponent = React.forwardRef<
HTMLInputElement,
InputAvatarProps
>(({ name, src, onChange }, ref) => (
    <label htmlFor={`upload_${name}`}>
        <input
            ref={ref}
            id={`upload_${name}`}
            name={name}
            onChange={onChange}
            type="file"
            className="input-upload"
        />
        <Avatar className="avatar-upload" src={src}>
            PR
        </Avatar>
    </label>
));

export const InputAvatar = React.memo(InputAvatarComponent);
