import React from 'react';
import { PageComponentProps } from 'client/shared/types';
import { NivelatorXY, Paper } from 'client/shared/components';
import bem from 'bem-cn';
import { StoreGameProps } from 'client/core/store';
import { LOCAL } from 'client/shared/consts';
import { useDispatch } from 'react-redux';
import { gameNextLevelAction } from 'client/core/store/actions/game.actions';
import { Button } from '@material-ui/core';

interface GameNextLevelProps extends PageComponentProps, StoreGameProps {}

const block = bem('next-level');

export const GameNextLevel: React.FC<GameNextLevelProps> = React.memo(({
    isPause,
}) => {
    const dispatch = useDispatch();

    const handleGameNextLevel = () => {
        dispatch(gameNextLevelAction(false));
    };

    return (
        <Paper className={block.state({ active: Boolean(isPause) })}>
            <NivelatorXY>
                <div className={block('help')}>
                    <h3>
                        {LOCAL.GAME_LEVEL_COMPLITE}
                    </h3>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleGameNextLevel}
                    >
                        {LOCAL.GAME_NEXT_LEVEL}
                    </Button>
                </div>
            </NivelatorXY>
        </Paper>
    );
});
