import { InputControlProps } from 'client/shared/components';
import { CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR } from 'client/shared/consts';

export const PROFILE_PASSWORD_CONTROLS: InputControlProps[] = [
    {
        name: 'oldPassword',
        label: 'Старый пароль',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
    {
        name: 'newPassword',
        label: 'Новый пароль',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
];
