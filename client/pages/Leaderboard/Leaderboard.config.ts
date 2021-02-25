import { Columns } from '@material-ui/data-grid';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';

export const block = bem('forum');

export const columns: Columns = [
    {
        field: 'player',
        headerName: LOCAL.LEADERBOARD_COLUMN_PLAYER,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'score',
        headerName: LOCAL.LEADERBOARD_COLUMN_SCORE,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
];
