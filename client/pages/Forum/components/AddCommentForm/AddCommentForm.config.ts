import { InputDataProps } from 'client/shared/components';

export const ADD_COMMENT_FORM_CONTROLS: InputDataProps[] = [
    {
        name: 'description',
        label: 'Комментарий',
        required: true,
        multiline: true,
        rows: 3,
        rowsMax: 10,
    },
];
