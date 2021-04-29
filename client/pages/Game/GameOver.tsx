import React, { useEffect } from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import { ROUTES } from 'client/routing';
import bem from 'bem-cn';
import {
    addResultToLeaderboardThunk, profileSelector, setUserSettingsAction, StoreGameProps,
} from 'client/core/store';
import { LOCAL } from 'client/shared/consts';
import { useDispatch, useSelector } from 'react-redux';
import { gameResetAction } from 'client/core/store/actions/game.actions';
import { Link } from '@material-ui/core';
import gameOver from './game-over.png';

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

        if (isOver) dispatch(setUserSettingsAction({ musicTheme: 'intro' }));
    }, [score, isOver]);

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
