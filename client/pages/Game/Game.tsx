import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { GamePainter, GameCanvas, PageLayout } from 'client/core';
import { ROUTES } from 'client/routing';
import classnames from 'classnames';
import { GAME_RESOURSES, GAME_VIEWPORT } from './Game.config';

export const Game: React.FC<PageComponentProps> = React.memo(({ className }) => {
    const Painter = new GamePainter();

    return (
        <PageLayout className={classnames('game', className)} goBackLink={ROUTES.GAME_START.path}>
            <div className="game__overlay">
                <GameCanvas
                    resources={GAME_RESOURSES}
                    drawCanvas={Painter.drawCanvas}
                    {...GAME_VIEWPORT}
                />
            </div>
        </PageLayout>
    );
});
