import { Columns } from '@material-ui/data-grid';
import bem from 'bem-cn';

export const block = bem('forum');

export const columns: Columns = [
    {
        field: 'autor',
        headerName: 'Игрок',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'score',
        headerName: 'Счет',
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
];
