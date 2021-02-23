import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { GamePainter, GameCanvas, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import { GAME_RESOURSES, GAME_VIEWPORT } from './Game.config';

const block = bem('game');

export const Game: React.FC<PageComponentProps> = React.memo(() => {
    const Painter = new GamePainter();

    return (
        <PageLayout className={block()} goBackLink={ROUTES.GAME_START.path}>
            <div className={block('overlay')}>
                <GameCanvas
                    resources={GAME_RESOURSES}
                    drawCanvas={Painter.drawCanvas}
                    {...GAME_VIEWPORT}
                />
            </div>
        </PageLayout>
    );
});
