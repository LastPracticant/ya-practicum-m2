import { InputDataProps } from 'client/shared/components';
import { CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR } from 'client/shared/consts';

export const PROFILE_EDIT_PASSWORD_CONTROLS: InputDataProps[] = [
    {
        name: 'oldPassword',
        label: 'Старый пароль',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
    {
        name: 'newPassword',
        label: 'Новый пароль',
        required: true,
        pattern: CHECK_ALLOWED_LENGTH_AND_TYPE_CHAR,
    },
];
