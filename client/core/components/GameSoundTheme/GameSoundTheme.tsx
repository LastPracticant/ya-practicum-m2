import './GameSoundTheme.css';

import React, {
    FC, useCallback, useLayoutEffect, useRef,
} from 'react';
import bem from 'bem-cn';
import { Button } from '@material-ui/core';
import { useElementVisible } from 'client/core/hooks';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { useSelector } from 'react-redux';
import { settingsSelector } from 'client/core/store';
import introSound from './audio/interface-background-sound.mp3';
import gameSound from './audio/game-background-sound.mp3';

const block = bem('game-sound-theme');

export const GameSoundTheme: FC = React.memo(() => {
    const userSettings = useSelector(settingsSelector);
    const {
        elementVisible,
        setElementVisible,
    } = useElementVisible();

    const audioRef = useRef<HTMLAudioElement>(null);

    const handleUnmuteMusic = useCallback(() => {
        if (!audioRef.current) return;

        audioRef.current.muted = false;
        audioRef.current.play();

        setElementVisible(false);
    }, []);

    useLayoutEffect(() => {
        if (!audioRef.current) return;
        if (!userSettings.isMusicEnabled) {
            audioRef.current.muted = true;

            return;
        }

        if (userSettings.musicTheme === 'game' && !audioRef.current.src.includes(gameSound)) {
            audioRef.current.src = gameSound;
        }

        if (userSettings.musicTheme === 'intro' && !audioRef.current.src.includes(introSound)) {
            audioRef.current.src = introSound;
        }

        const promise = audioRef.current?.play();

        if (promise) {
            promise.then(() => {
                audioRef.current!.muted = false;
            }).catch(() => {
                setElementVisible(true);
            });
        }
    }, [userSettings]);

    return (
        <div className={block()}>
            <audio
                ref={audioRef}
                preload="none"
                src={introSound}
                loop
                muted
            />

            {elementVisible && (
                <div className={block('unmute-music')}>
                    <Button onClick={handleUnmuteMusic}>
                        <VolumeOffIcon />
                    </Button>
                </div>
            )}
        </div>
    );
});
