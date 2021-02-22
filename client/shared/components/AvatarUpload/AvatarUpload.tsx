import React from 'react';
import { Avatar, InputProps } from '@material-ui/core';
import './AvatarUpload.css';
import { AVATAR_DEFAULT } from 'client/shared/consts';

export interface InputAvatarProps extends InputProps {
    name: string;
    src?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarUploadComponent = React.forwardRef<
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
            {AVATAR_DEFAULT}
        </Avatar>
    </label>
));

export const AvatarUpload = React.memo(AvatarUploadComponent);
