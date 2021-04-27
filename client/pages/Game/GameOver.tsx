import React, { useEffect } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import { addResultToLeaderboardThunk, profileSelector, StoreGameProps } from 'client/core/store';
import { LOCAL } from 'client/shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import { gameResetAction } from 'client/core/store/actions/game.actions';
import { Link } from '@material-ui/core';
import interfaceSound from 'client/core/components/GameCanvas/audio/interface-background-sound.mp3';
import gameOver from './game-over.png';
import { GameMusicTheme } from './Game.config';

interface GameOverProps extends PageComponentProps, StoreGameProps {}

const block = bem('game-over');

export const GameOver: React.FC<GameOverProps> = React.memo(({
    isOver,
    score = 0,
}) => {
    const dispatch = useDispatch();
    const profile = useSelector(profileSelector);

    const handleGameReset = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        dispatch(gameResetAction());
    };

    useEffect(() => {
        dispatch(addResultToLeaderboardThunk({
            userId: profile.id,
            score,
        }));

        GameMusicTheme?.change(interfaceSound);
    }, [score]);

    return (
        <Paper className={block.state({ active: Boolean(isOver) })}>
            <NivelatorXY>
                <div className={block('help')}>
                    <div className={block('banner')}>
                        <img src={gameOver} alt={LOCAL.GAME_OVER} />
                    </div>
                    <h3>
                        <Link
                            href={ROUTES.GAME.path}
                            onClick={handleGameReset}
                        >
                            {LOCAL.GAME_RESET}
                        </Link>
                    </h3>
                    <p>
                        {LOCAL.GAME_SCORE}: {score}
                    </p>
                </div>
            </NivelatorXY>
        </Paper>
    );
});
