import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import { StoreGameProps } from 'client/core/store';
import { LOCAL } from 'client/shared/consts';
import gameOver from './game-over.png';

interface GameOverProps extends PageComponentProps, StoreGameProps {}

const block = bem('game-over');

export const GameOver: React.FC<GameOverProps> = React.memo(({
    isOver,
    score = 0,
}) => (
        <Paper className={block.state({ active: isOver })}>
            <NivelatorXY>
                <div className={block('help')}>
                    <div className={block('banner')}>
                        <img src={gameOver} alt={LOCAL.GAME_OVER} />
                    </div>
                    <h3>
                        <a href={ROUTES.GAME.path}>{LOCAL.GAME_RESET}</a>
                    </h3>
                    <p>
                        {LOCAL.GAME_SCORE}: {score}
                    </p>
                </div>
            </NivelatorXY>
        </Paper>
));
