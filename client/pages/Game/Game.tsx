import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { GamePainter, GameCanvas } from 'client/core';
import bg5 from 'client/core/components/GameCanvas/img/bg5.png';
import hero from 'client/core/components/GameCanvas/img/hero.png';

export const Game: React.FC<PageComponentProps> = React.memo(({ title }) => {
    const Painter = new GamePainter();

    return (
        <div>
            <header>
                {title}
            </header>
            <main>
                <GameCanvas
                    resources={[bg5, hero]}
                    drawCanvas={Painter.drawCanvas}
                    width="1000"
                    height="600"
                />
            </main>
        </div>
    );
});
