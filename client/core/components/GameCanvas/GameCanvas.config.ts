import { Store } from 'client/shared/types';

export const ANIMATION = {
    secDivider: 1000,
};

export const CONTROLS = {
    jump: 'ArrowUp',
    down: 'ArrowDown',
    shot: 'Space',
};

export interface MoveOptionsProps {
    /** Флаг, нажата ли кнопка движения  */
    pressed: boolean

    /** Счетчик движения */
    count: number

    /** Максимальная длина */
    amplitude: number

    /** Текущая позиция */
    position: number

    /** Задержка движения */
    delay: number
}

/** https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/drawImage */
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
    /** Настройки кадра */
    frame: Omit<CanvasImageCoordinatesProps, 'dx' | 'dy'>

    /** Произошедшие столкновения */
    encounters: CanvasImageCoordinatesProps[]
}

export interface EnemyTypeProps {
    sx: number
    sy: number
    sWidth: number
    sHeight: number
    unitWidth: number
    unitHeight: number
    type: 'technology' | 'technologyAir' | 'company' | 'companyAir' | 'bug' | 'reviewer' | 'water'
}

export interface EnemiesArmyProps extends CanvasImageCoordinatesProps {
    type: EnemyTypeProps['type']
}

export interface EnemiesProps {
    /** Скорость врагов */
    speed: number

    /** Частота генерации */
    frequency: number

    /** Разновидности врагов */
    types: EnemyTypeProps[]

    /** Сгенерированные враги */
    army: EnemiesArmyProps[]
}

export interface HeroProps {
    /** Координаты героя */
    coord: Omit<CanvasImageCoordinatesProps, 'sx' | 'sy'>

    /** Количество жизней */
    lifes: number

    /** Количество снарядов (идей) */
    ideas: number

    /** Скорость снаряда */
    bulletSpeed: number

    /** Сделанные выстрелы */
    shots: Pick<CanvasImageCoordinatesProps, 'dx' | 'dy' | 'dWidth' | 'dHeight'>[],
}

export interface LevelsOptionProps {
    /** Продолжительность уровня (сек) */
    duration: number

    /** Настройки: фон */
    bg: Omit<CanvasImageCoordinatesProps, 'dx' | 'dy' | 'dWidth' | 'dHeight'>

    /** Настройки: враги */
    enemies: number[]

    /** Сдвиг по оси Y для героя */
    heroShiftY: number

    /** Флаг достижения босса */
    isBossReached: boolean
}

export interface LevelsProps {
    /** Настройки уровней */
    options: LevelsOptionProps[]

    /** Текущий уровень */
    currentLevel: number

    /** Таймер игры */
    timer: number
}

export interface GameOptionProps {
    /** Настройки: движения */
    move: Store<MoveOptionsProps>

    /** Настройки: взрывы\столкновения */
    explosion: ExplosionProps

    /** Настройки: враги */
    enemies: EnemiesProps

    /** Настройки: герой */
    hero: HeroProps

    /** Настройки: уровни */
    levels: LevelsProps
}

export const GAME_OPTIONS: GameOptionProps = {
    move: {
        jump: {
            pressed: false,
            count: 0,
            amplitude: 50,
            position: 0,
            delay: 0,
        },
        down: {
            pressed: false,
            count: 0,
            amplitude: 35,
            position: 0,
            delay: 0,
        },
    },
    explosion: {
        frame: {
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
        frequency: 50,
        speed: 5,
        types: [
            {
                type: 'technologyAir', sx: 0, sy: 0, sWidth: 2160, sHeight: 90, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'technology', sx: 0, sy: 90, sWidth: 2160, sHeight: 180, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'companyAir', sx: 0, sy: 180, sWidth: 1260, sHeight: 270, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'company', sx: 0, sy: 270, sWidth: 1260, sHeight: 360, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'bug', sx: 0, sy: 360, sWidth: 180, sHeight: 450, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'water', sx: 0, sy: 450, sWidth: 1260, sHeight: 540, unitWidth: 90, unitHeight: 90,
            },
            {
                type: 'reviewer', sx: 0, sy: 540, sWidth: 684, sHeight: 655, unitWidth: 114, unitHeight: 210,
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
        lifes: 3,
        ideas: 3,
        bulletSpeed: 5,
        shots: [],
    },
    levels: {
        options: [
            {
                // TODO: для демонстрации выставлено 15 сек, чтобы можно было
                // походить по всем уровням
                duration: 45,
                bg: {
                    sx: 0, sy: 0, sWidth: 2134, sHeight: 600,
                },
                enemies: [1, 4, 5],
                heroShiftY: 215,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 600, sWidth: 2134, sHeight: 600,
                },
                enemies: [1, 4, 5],
                heroShiftY: 205,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 1200, sWidth: 2134, sHeight: 600,
                },
                enemies: [0, 1, 4],
                heroShiftY: 140,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 1800, sWidth: 2134, sHeight: 600,
                },
                enemies: [0, 1, 4],
                heroShiftY: 210,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 2400, sWidth: 2134, sHeight: 600,
                },
                enemies: [0, 1, 4],
                heroShiftY: 210,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 3000, sWidth: 2134 * 2, sHeight: 600,
                },
                enemies: [0, 1, 4],
                heroShiftY: 210,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 3600, sWidth: 2134, sHeight: 600,
                },
                enemies: [2, 3, 4],
                heroShiftY: 150,
                isBossReached: false,
            },
            {
                duration: 45,
                bg: {
                    sx: 0, sy: 4200, sWidth: 2134, sHeight: 600,
                },
                enemies: [2, 3, 4],
                heroShiftY: 150,
                isBossReached: false,
            },
            {
                duration: 9999999,
                bg: {
                    sx: 0, sy: 4800, sWidth: 2134, sHeight: 600,
                },
                enemies: [0, 1, 2, 3, 4],
                heroShiftY: 210,
                isBossReached: false,
            },
        ],
        timer: 0,
        currentLevel: 0,
    },
};
