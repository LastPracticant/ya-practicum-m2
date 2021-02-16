import React from 'react'
import { PageComponentProps } from 'client/shared/types'
import { Paper, Chip, Icon } from 'client/shared/components'

export const Leaderboard: React.FC<PageComponentProps> = React.memo(
    ({ title }) => {
        const leaders = [
            ['user1', '50000'],
            ['user2', '35000'],
            ['user3', '25000'],
            ['You', '15000'],
            ['User4', '7000']
        ]

        const leadersList = leaders.map(([name, count], index) => (
            <li key={`leader-${index}`}className='justify-space_between'>
                <Icon type='emoji_events' />
                <p>{name}</p>
                <Chip>{count}</Chip>
            </li>
        ))
        return (
            <Paper>
                <h1>{title}</h1>
                <ul>{leadersList}</ul>
            </Paper>
        )
    }
)
