import { InputControlProps } from 'client/shared/components';
import {
    CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    CHECK_PHONE_NUMBER,
    CHECK_EMAIL,
} from 'client/shared/consts';

export const PROFILE_FORM_CONTROLS: InputControlProps[] = [
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
        name: 'display_name',
        label: 'Отображаемое имя',
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
];
