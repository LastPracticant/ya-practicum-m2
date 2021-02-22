import { InputControlProps } from 'client/shared/components';
import {
    CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    CHECK_EMAIL,
    CHECK_PHONE_NUMBER,
} from 'client/shared/consts';

export const SIGNUP_FORM_CONTROLS: InputControlProps[] = [
    {
        name: 'email',
        label: 'Почта',
        type: 'email',
        required: true,
        pattern: CHECK_EMAIL,
        variant: 'outlined',
    },
    {
        name: 'login',
        label: 'Логин',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
    {
        name: 'first_name',
        label: 'Имя',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
    {
        name: 'second_name',
        label: 'Фамилия',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
    {
        name: 'phone',
        label: 'Телефон',
        required: true,
        pattern: CHECK_PHONE_NUMBER,
        variant: 'outlined',
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
    {
        name: 'password_confirm',
        label: 'Пароль (ещё раз)',
        type: 'password',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
        variant: 'outlined',
    },
];
