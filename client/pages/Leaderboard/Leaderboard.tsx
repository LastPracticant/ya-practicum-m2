import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { Paper } from 'client/shared/components';

export const Leaderboard: React.FC<PageComponentProps> = React.memo(
    ({ title }) => {
        const leaders = [
            ['user1', '50000'],
            ['user2', '35000'],
            ['user3', '25000'],
            ['You', '15000'],
            ['User4', '7000'],
        ];

        const leadersList = leaders.map(([name]) => (
            <li key={`leader-${name}`} className="justify-space_between">
                <p>{name}</p>
            </li>
        ));
        return (
            <Paper>
                <h1>{title}</h1>
                <ul>{leadersList}</ul>
            </Paper>
        );
    },
);
