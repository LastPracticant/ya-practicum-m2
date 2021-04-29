import './Game.css';

import React, { useMemo } from 'react';
import { PageComponentProps } from 'client/shared/types';
import {
    GamePainter, GameCanvas, PageLayout, Meta,
} from 'client/core';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import { GAME_OPTIONS } from 'client/core/components/GameCanvas/GameCanvas.config';
import { cloneDeep } from 'client/shared/utils';
import { useSelector } from 'react-redux';
import { gameSelector } from 'client/core/store';
import { withCheckAuth } from 'client/core/HOCs';
import { NoSsr } from '@material-ui/core';
import { GAME_RESOURSES, GAME_VIEWPORT } from './Game.config';
import { GameOver } from './GameOver';
import { GameNextLevel } from './GameNextLevel';

const block = bem('game');

const GameComponent: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const { game: gameState } = useSelector(gameSelector);

    const Painter = useMemo(() => {
        const options = cloneDeep(GAME_OPTIONS);

        return new GamePainter({
            ...options,
            levels: {
                ...options.levels,
                currentLevel: gameState.currentLevel || 0,
            },
        });
    }, [
        gameState,
    ]);

    return (
        <PageLayout className={block()} goBackLink={ROUTES.GAME_START.path}>
            <Meta title={title} />

            <NoSsr>
                <div className={block('overlay')}>
                    <GameCanvas
                        resources={GAME_RESOURSES}
                        drawCanvas={Painter.drawCanvas}
                        {...GAME_VIEWPORT}
                    />
                </div>

                <GameOver {...gameState} />
                <GameNextLevel {...gameState} />
            </NoSsr>
        </PageLayout>
    );
});

export const Game = withCheckAuth(GameComponent);
