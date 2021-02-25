import { Columns } from '@material-ui/data-grid';
import bem from 'bem-cn';
import { LEADERBOARD_COLUMN_PLAYER, LEADERBOARD_COLUMN_SCORE } from 'client/shared/consts';

export const block = bem('forum');

export const columns: Columns = [
    {
        field: 'player',
        headerName: LEADERBOARD_COLUMN_PLAYER,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
    {
        field: 'score',
        headerName: LEADERBOARD_COLUMN_SCORE,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
    },
];
