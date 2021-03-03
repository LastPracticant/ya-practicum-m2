import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { PageLayout } from 'client/core';
import { NivelatorXY, Paper } from 'client/shared/components';
import { Button } from '@material-ui/core';
import { ROUTES } from 'client/routing';
import { useHistory } from 'react-router-dom';
import bem from 'bem-cn';
import { LOCAL } from 'client/shared/consts';
import { withCheckAuth } from 'client/core/HOCs';

const block = bem('game-start');

const GameStartComponent: React.FC<PageComponentProps> = React.memo(() => {
    const history = useHistory();

    const handleGameStart = () => {
        history.push(ROUTES.GAME.path);
    };

    return (
        <PageLayout className={block()}>
            <Paper>
                <NivelatorXY>
                    <div>
                        <div className={block('help')}>
                            <h3>{LOCAL.GAME_CONTROL}</h3>

                            <div className={block('control')}>
                                <p>{LOCAL.GAME_CONTROL_JUMP}</p>
                                <p>{LOCAL.GAME_CONTROL_DOWN}</p>
                                <p>{LOCAL.GAME_CONTROL_SHOTE}</p>
                            </div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleGameStart}
                                className={block('toggle')}
                            >
                                {LOCAL.GAME_START}
                            </Button>
                        </div>
                    </div>
                </NivelatorXY>
            </Paper>
        </PageLayout>
    );
});

export const GameStart = withCheckAuth(GameStartComponent);
