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
    },
    {
        name: 'login',
        label: 'Логин',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
    {
        name: 'first_name',
        label: 'Имя',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
    {
        name: 'second_name',
        label: 'Фамилия',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
    {
        name: 'phone',
        label: 'Телефон',
        required: true,
        pattern: CHECK_PHONE_NUMBER,
    },
];
