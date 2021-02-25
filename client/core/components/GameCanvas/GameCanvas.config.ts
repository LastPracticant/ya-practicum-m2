import { Store } from 'client/shared/types';

export const ANIMATION = {
    time: 1000,
    speedMultiplier: 460,
};

export const CONTROLS = {
    jump: 'ArrowUp',
    down: 'ArrowDown',
    shot: 'Space',
};

export interface MoveOptionsProps {
    pressed: boolean
    count: number
    length: number
    height: number
    delay: number
}

export interface CanvasImageCoordinatesProps {
    sx: number
    sy: number
    sWidth: number
    sHeight: number
    dx: number
    dy: number
    dWidth: number
    dHeight: number
}

export interface ExplosionProps {
    cutOptions: Omit<CanvasImageCoordinatesProps, 'dx' | 'dy'>
    encounters: CanvasImageCoordinatesProps[]
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

export interface EnemiesProps {
    tickCounter: number
    frequency: number
    types: EnemyTypeProps[],
    army: CanvasImageCoordinatesProps[],
}

export interface HeroProps {
    coord: Omit<CanvasImageCoordinatesProps, 'sx' | 'sy'>
    shiftY: number,
    lifes: number
    ideas: number
    bulletSpeed: number
    shots: Pick<CanvasImageCoordinatesProps, 'dx' | 'dy' | 'dWidth' | 'dHeight'>[],
}

export interface GameOptionProps {
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
        cutOptions: {
            sx: 0,
            sy: 0,
            sWidth: 300,
            sHeight: 200,
            dWidth: 120,
            dHeight: 90,
        },
        encounters: [],
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
        coord: {
            sWidth: 75,
            sHeight: 80,
            dx: 210,
            dy: 0,
            dWidth: 75,
            dHeight: 80,
        },
        shiftY: 210,
        lifes: 3,
        ideas: 3,
        bulletSpeed: 5,
        shots: [],
    },
};
