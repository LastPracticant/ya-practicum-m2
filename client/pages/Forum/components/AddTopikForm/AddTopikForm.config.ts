import { InputDataProps } from 'client/shared/components';

export const ADD_TOPIK_FORM_CONTROLS: InputDataProps[] = [
    {
        name: 'name',
        label: 'Тема',
        required: true,
    },
    {
        name: 'description',
        label: 'Описание',
        required: true,
        multiline: true,
        rows: 5,
        rowsMax: 10,
    },
];
