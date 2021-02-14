import React from 'react'
import { PageComponentProps } from 'shared/types'
import Theme from 'SharedStyles/theme/Theme'
import {
    Typography,
    Paper,
    List,
    ListItemText,
    ListItem,
    Chip,
    ListItemIcon
} from '../../shared/components/index'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        width: 500,
        flexDirection: 'column',
        margin: 'auto',
        padding: Theme.space(2)
    }
})

export const Leaderboard: React.FC<PageComponentProps> = ({ title }) => {
    const classes = useStyles()

    const leaders = [
        ['user1', '50000'],
        ['user2', '35000'],
        ['user3', '25000'],
        ['You', '15000'],
        ['User4', '7000']
    ]
    return (
        <Paper className={classes.root}>
            <Typography
                variant='h1'
                align='center'
                style={{ marginBottom: 32 }}
            >
                {title}
            </Typography>
            <List>
                {leaders.map(([name, count], index) => (
                    <ListItem>
                        <ListItemIcon type='emoji_events' />
                        <ListItemText>{name}</ListItemText>
                        <Chip>{count}</Chip>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}
