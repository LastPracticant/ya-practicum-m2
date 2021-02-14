import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper, Chip, Icon } from 'SharedComponents';

export const Leaderboard: React.FC<PageComponentProps> = React.memo(
    ({ title }) => {
        const leaders = [
            ['user1', '50000'],
            ['user2', '35000'],
            ['user3', '25000'],
            ['You', '15000'],
            ['User4', '7000'],
        ];

        const getListLeaders = leaders.map(([name, count]) => (
            <li style={{ justifyContent: 'space-between' }}>
                <Icon type="emoji_events" />
                <p>{name}</p>
                <Chip>{count}</Chip>
            </li>
        ));
        return (
            <Paper style={{
                display: 'flex',
                width: 500,
                flexDirection: 'column',
                margin: 'auto',
                padding: 16,
            }}
            >
                <h1 style={{ marginBottom: 32, textAlign: 'center' }}>
                    {title}
                </h1>
                <ul>{getListLeaders}</ul>
            </Paper>
        );
    },
);
