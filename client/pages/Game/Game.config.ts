import { isServer } from 'client/core/store/store.consts';
import { GameSound } from 'client/core/components/GameCanvas/GameSound';

import bgs from 'client/core/components/GameCanvas/img/bgs.png';
import hero from 'client/core/components/GameCanvas/img/hero.png';
import idea from 'client/core/components/GameCanvas/img/idea.png';
import life from 'client/core/components/GameCanvas/img/life.png';
import explosion from 'client/core/components/GameCanvas/img/explosion.png';
import enemies from 'client/core/components/GameCanvas/img/enemies.png';

import heroDamage from 'client/core/components/GameCanvas/audio/hero-damage.mp3';
import enemyDamage from 'client/core/components/GameCanvas/audio/explosion.mp3';

export const setGameSounds = !isServer ? () => ({
    heroDamage: new GameSound(heroDamage),
    enemyDamage: new GameSound(enemyDamage),
}) : undefined;

export const GAME_RESOURSES = {
    bgs,
    hero,
    idea,
    life,
    explosion,
    enemies,
};

export const GAME_VIEWPORT = {
    width: 1000,
    height: 600,
};
