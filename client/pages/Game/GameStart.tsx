import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { PageLayout } from 'client/core';
import { NivelatorXY, Paper } from 'client/shared/components';
import { Button } from '@material-ui/core';
import { ROUTES } from 'client/routing';
import { useHistory } from 'react-router-dom';

export const GameStart: React.FC<PageComponentProps> = React.memo(() => {
    const history = useHistory();

    const handleGameStart = () => {
        history.push(ROUTES.GAME.path);
    };

    return (
        <PageLayout className="game-start">
            <Paper>
                <NivelatorXY>
                    <div>
                        <div className="game-start__help">
                            <h3>Управление в игре</h3>
                            <p>Прыгнуть - стрелка вверх</p>
                            <p>Присесть - стрелка вниз</p>
                        </div>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleGameStart}
                            className="game-start__toggle"
                        >
                            Начать игру
                        </Button>
                    </div>
                </NivelatorXY>
            </Paper>
        </PageLayout>
    );
});
