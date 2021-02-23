import './Game.css';

import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { PageLayout } from 'client/core';
import { NivelatorXY, Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import { Link } from 'react-router-dom';
import bem from 'bem-cn';
import gameOver from './game-over.png';

const block = bem('game-over');

export const GameOver: React.FC<PageComponentProps> = React.memo(() => (
        <PageLayout className={block()}>
            <Paper>
                <NivelatorXY>
                    <div>
                        <div className={block('help')}>
                            <div className={block('banner')}>
                                <img src={gameOver} alt="Игра закончена" />
                            </div>
                            <h3>
                                <Link to={ROUTES.GAME.path}>Заново?</Link>
                            </h3>
                            <p>Счет: 25</p>
                        </div>
                    </div>
                </NivelatorXY>
            </Paper>
        </PageLayout>
));
