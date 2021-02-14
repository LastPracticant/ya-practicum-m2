import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Theme } from 'SharedStyles/theme';
import {
    Typography,
    Paper,
    List,
    ListItemText,
    ListItem,
    Chip,
    ListItemIcon,
} from 'SharedComponents';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        width: 500,
        flexDirection: 'column',
        margin: 'auto',
        padding: Theme.space(2),
    },
});

export const Leaderboard: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const classes = useStyles();

    const leaders = [
        ['user1', '50000'],
        ['user2', '35000'],
        ['user3', '25000'],
        ['You', '15000'],
        ['User4', '7000'],
    ];

    const getListLeaders = leaders.map(([name, count]) => (
        <ListItem>
            <ListItemIcon type="emoji_events" />
            <ListItemText>{name}</ListItemText>
            <Chip>{count}</Chip>
        </ListItem>
    ));
    return (
        <Paper className={classes.root}>
            <Typography
                variant="h1"
                align="center"
                style={{ marginBottom: 32 }}
            >
                {title}
            </Typography>
            <List>
                {getListLeaders}
            </List>
        </Paper>
    );
});
