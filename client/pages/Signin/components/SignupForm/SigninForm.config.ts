import { InputControlProps } from 'client/shared/components';
import { CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR } from 'client/shared/consts';

export const SIGNIN_FORM_CONTROLS: InputControlProps[] = [
    {
        name: 'login',
        label: 'Логин',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
];
