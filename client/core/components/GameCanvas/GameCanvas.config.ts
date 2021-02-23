import { Store } from 'client/shared/types';

export const ANIMATION = {
    time: 1000,
    speedMultiplier: 460,
};

export const CONTROLS = {
    jump: 'ArrowUp',
    down: 'ArrowDown',
    shote: 'Space',
};

interface MoveOptionsProps {
    pressed: boolean
    count: number
    length: number
    height: number
    delay: number
}

interface PositionProps {
    x: number
    y: number
}

interface ExplosionProps {
    shiftX: number
    shiftY: number
    width: number
    height: number
}

export interface EnemyTypeProps {
    sx: number
    sy: number
    sWidth: number
    sHeight: number
    unitWidth: number
    unitHeight: number
    type: 'technology' | 'technologyAir' | 'company' | 'companyAir' | 'bug' | 'reviewer'
}

interface EnemiesProps {
    tickCounter: number
    frequency: number
    types: EnemyTypeProps[],
    army: EnemiesArmyProps[],
}

interface EnemiesArmyProps{
    sx: number
    sy: number
    sWidth: number
    sHeight: number
    dx: number
    dy: number
    dWidth: number
    dHeight: number
}

interface HeroProps {
    width: number
    height: number
    position: PositionProps,
    currentPosition: PositionProps,
    lifes: number
    ideas: number
    bulletSpeed: number
    shotes: PositionProps[],
}

interface GameOptionProps {
    move: Store<MoveOptionsProps>
    explosion: ExplosionProps
    enemies: EnemiesProps
    hero: HeroProps
}

export const GAME_OPTIONS: GameOptionProps = {
    move: {
        jump: {
            pressed: false,
            count: 0,
            length: 50,
            height: 0,
            delay: 0,
        },
        down: {
            pressed: false,
            count: 0,
            length: 35,
            height: 0,
            delay: 0,
        },
    },
    explosion: {
        shiftX: 0,
        shiftY: 0,
        width: 120,
        height: 90,
    },
    enemies: {
        tickCounter: 0,
        frequency: 65,
        types: [
            {
                type: 'technologyAir', sx: 0, sy: 0, sWidth: 2160, sHeight: 90, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'technology', sx: 0, sy: 90, sWidth: 2160, sHeight: 180, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'company', sx: 0, sy: 180, sWidth: 1260, sHeight: 270, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'companyAir', sx: 0, sy: 270, sWidth: 1260, sHeight: 360, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'bug', sx: 0, sy: 360, sWidth: 90, sHeight: 450, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'reviewer', sx: 0, sy: 450, sWidth: 111, sHeight: 655, unitWidth: 111, unitHeight: 205,
            },
        ],
        army: [],
    },
    hero: {
        width: 75,
        height: 80,
        position: {
            x: 210,
            y: 210,
        },
        currentPosition: {
            x: 0,
            y: 0,
        },
        lifes: 3,
        ideas: 3,
        bulletSpeed: 5,
        shotes: [],
    },
};
