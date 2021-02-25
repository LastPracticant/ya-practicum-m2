import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { GamePainter, GameCanvas, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import { GAME_OPTIONS } from 'client/core/components/GameCanvas/GameCanvas.config';
import { cloneDeep } from 'client/shared/utils';
import { useSelector } from 'react-redux';
import { gameSelector } from 'client/core/store';
import { GAME_RESOURSES, GAME_VIEWPORT } from './Game.config';
import { GameOver } from './GameOver';

const block = bem('game');

export const Game: React.FC<PageComponentProps> = React.memo(() => {
    const options = cloneDeep(GAME_OPTIONS);
    const Painter = new GamePainter(options);
    const { game: gameState } = useSelector(gameSelector);

    return (
        <PageLayout className={block()} goBackLink={ROUTES.GAME_START.path}>
            <div className={block('overlay')}>
                <GameCanvas
                    resources={GAME_RESOURSES}
                    drawCanvas={Painter.drawCanvas}
                    {...GAME_VIEWPORT}
                />
            </div>
            <GameOver {...gameState} />
        </PageLayout>
    );
});
