import { StoreGameProps } from 'client/core/store';
import { FnActionRequiredProps, Store } from 'client/shared/types';
import { getRandomIntInclusive } from 'client/shared/utils';
import {
    CONTROLS,
    EnemiesProps,
    EnemyTypeProps,
    ExplosionProps,
    GameOptionProps,
    HeroProps,
    LevelsProps,
    MoveOptionsProps,
} from './GameCanvas.config';
import {
    calcScore,
    drawImage,
    isHaveBulletEncounter,
    isHaveHeroEncounter,
} from './GameCanvas.utils';
import { ResourcesProps } from './ResourcesLoader';

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D
    frameCount: number
    shift: number
    keyPress?: string | null
    resources?: ResourcesProps
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    move: Store<MoveOptionsProps>;

    explosion: ExplosionProps;

    enemies: EnemiesProps;

    hero: HeroProps;

    levels: LevelsProps;

    constructor(options: GameOptionProps) {
        this.move = options.move;
        this.explosion = options.explosion;
        this.enemies = options.enemies;
        this.hero = options.hero;
        this.levels = options.levels;

        this.drawBg = this.drawBg.bind(this);
        this.drawHero = this.drawHero.bind(this);
        this.drawCanvas = this.drawCanvas.bind(this);
    }

    drawHeroMove(moveKey: string) {
        this.move[moveKey].count++;

        this.move[moveKey].position = 4 * this.move[moveKey].amplitude * Math.sin(
            (Math.PI * this.move[moveKey].count) / this.move[moveKey].amplitude,
        );
    }

    resetHeroMove(moveKey: string) {
        this.move[moveKey].count = 0;
        this.move[moveKey].pressed = false;
        this.move[moveKey].position = 0;
    }

    drawBg({
        ctx,
        resources,
        shift,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const speedMultiplier = 460;

        const { bgs } = resources;

        const { bg } = this.levels.options[this.levels.currentLevel];

        const calculateShift = (shift * speedMultiplier) % (bg.sWidth / 2);

        for (let i = 0; i < 3; i++) {
            const half = bg.sWidth / 2;
            const coefficient = half * i;

            drawImage(
                bgs, {
                    ...bg,
                    dx: 0 - calculateShift + bg.sWidth - coefficient,
                    dy: 0,
                    dWidth: bg.sWidth,
                    dHeight: ctx.canvas.height,
                },
                ctx,
            );
        }
    }

    drawLifes({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { life } = resources;

        for (let i = 1; i <= this.hero.lifes; i++) {
            ctx.drawImage(life, 50 * i - 20, 30, 40, 35);
        }
    }

    drawIdeas({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { idea } = resources;

        for (let i = 1; i <= this.hero.ideas; i++) {
            ctx.drawImage(idea, 50 * i - 20, 80, 40, 35);
        }
    }

    calculateEnemiesDY(enemy: EnemyTypeProps, ctx: CanvasRenderingContext2D) {
        const basePosition = ctx.canvas.height - this.levels.options[this.levels.currentLevel].heroShiftY;
        const airUnits = basePosition - 80;
        const earthUnits = basePosition + 10;
        const boss = basePosition - 125;

        switch (enemy.type) {
        case 'companyAir':
        case 'technologyAir':
        case 'water':
            return airUnits;
        case 'reviewer':
            return boss;
        default:
            return earthUnits;
        }
    }

    generateEnemies({
        ctx,
        frameCount,
    }: DrawCanvasProps) {
        if (frameCount % this.enemies.frequency < this.enemies.frequency - 1) return;

        const lvl = this.levels.options[this.levels.currentLevel];

        const lvlEnemies = lvl.enemies;
        const enemiesTypes = this.enemies.types;
        const enemyTypeBoss = 6;
        let isNeedToDrawBoss = false;

        if ((calcScore(this.levels.timer) >= lvl.duration) && !lvl.isBossReached) {
            lvl.isBossReached = true;
            isNeedToDrawBoss = true;
        }

        const randomEnemyType = lvlEnemies[getRandomIntInclusive(0, lvlEnemies.length - 1)];
        const calcEnemy = enemiesTypes[
            isNeedToDrawBoss
                ? enemyTypeBoss
                : randomEnemyType
        ];
        const randomEnemyNumber = getRandomIntInclusive(
            1, calcEnemy.sWidth / calcEnemy.unitWidth,
        );

        this.enemies.army.push({
            sx: (randomEnemyNumber - 1) * calcEnemy.unitWidth,
            sy: calcEnemy.sy,
            sWidth: calcEnemy.unitWidth,
            sHeight: calcEnemy.unitHeight,
            dx: this.enemies.army.length
                ? ctx.canvas.width + getRandomIntInclusive(0, 60)
                : ctx.canvas.width,
            dy: this.calculateEnemiesDY(calcEnemy, ctx),
            dWidth: calcEnemy.unitWidth,
            dHeight: calcEnemy.unitHeight,
            type: calcEnemy.type,
        });

        if (this.enemies.army.length > 20) {
            this.enemies.army.splice(0, this.enemies.army.length / 2);
        }
    }

    drawEnemies({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { enemies } = resources;

        this.enemies.army.forEach((coord, index) => {
            drawImage(enemies, coord, ctx);

            this.enemies.army[index].dx -= this.enemies.speed;
        });
    }

    checkEncounters(
        gameOverFn: FnActionRequiredProps<StoreGameProps>,
        gamePauseFn: FnActionRequiredProps<StoreGameProps>,
    ) {
        const anemyExplosionShiftY = 30;
        const heroExplosionShiftY = 5;
        const score = calcScore(this.levels.timer);

        let levelComplite = false;
        let isBossWin = false;

        this.enemies.army.forEach((enemy, i) => {
            /** Столкновение врагов со снарядами */
            this.hero.shots.forEach((shot, j) => {
                if (isHaveBulletEncounter(shot, enemy)) {
                    this.explosion.encounters.push({
                        ...this.explosion.frame,
                        dx: shot.dx,
                        dy: shot.dy - anemyExplosionShiftY,
                    });
                    this.enemies.army.splice(i, 1);
                    this.hero.shots.splice(j, 1);

                    if (enemy.type === 'reviewer') {
                        levelComplite = true;
                    }
                }
            });

            /** Столкновение врагов с главным героем */
            if (isHaveHeroEncounter(this.hero.coord, enemy)) {
                this.explosion.encounters.push({
                    ...this.explosion.frame,
                    dx: this.hero.coord.dx,
                    dy: this.hero.coord.dy - heroExplosionShiftY,
                });
                this.enemies.army.splice(i, 1);

                this.hero.lifes--;

                if (enemy.type === 'reviewer') {
                    isBossWin = true;
                }
            }
        });

        if (this.hero.lifes === 0 || isBossWin) {
            gameOverFn({
                isOver: true,
                score,
            });
        }

        if (levelComplite) {
            gamePauseFn({
                isPause: true,
                score,
            });
        }
    }

    drawExplosion({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { explosion } = resources;

        let isDone = false;

        /** Длина за вычетом 1 кадра. Полная длина 1500. */
        const spriteWidth = 1200;
        /** Высота за вычетом 1 кадра. Полная высота 1000. */
        const spriteHeight = 800;

        this.explosion.encounters.forEach((encounter, index) => {
            if (encounter.sx === spriteWidth) {
                encounter.sx = 0;
                encounter.sy += encounter.sHeight;
            } else {
                encounter.sx += encounter.sWidth;
                isDone = false;
            }

            if (
                encounter.sy === spriteHeight
                && encounter.sx === spriteWidth
            ) {
                encounter.sy = 0;
                isDone = true;
            }

            drawImage(explosion, encounter, ctx);

            if (isDone) {
                this.explosion.encounters.splice(index, 1);
            }
        });
    }

    restoreIdeas({ frameCount }: DrawCanvasPartProps) {
        if (!(frameCount % 200) && this.hero.ideas < 3) {
            this.hero.ideas++;
        }
    }

    drawShote({ ctx, resources }: DrawCanvasPartProps) {
        if (!resources) return;

        const { idea } = resources;

        this.hero.shots.forEach((shot, index) => {
            ctx.drawImage(
                idea,
                shot.dx,
                shot.dy,
                30,
                30,
            );

            this.hero.shots[index].dx += this.hero.bulletSpeed;
        });
    }

    drawHero({
        ctx,
        resources,
        keyPress,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const lvl = this.levels.options[this.levels.currentLevel];
        const { hero } = resources;

        if (keyPress === CONTROLS.jump) {
            if (!this.move.down.pressed) this.move.jump.pressed = true;
        }

        if (keyPress === CONTROLS.down) {
            if (!this.move.jump.pressed) this.move.down.pressed = true;
        }

        if (this.move.jump.pressed) {
            this.drawHeroMove('jump');
        }

        if (this.move.down.pressed) {
            this.move.down.count++;
        }

        if (this.move.jump.count > this.move.jump.amplitude) {
            this.resetHeroMove('jump');
        }

        if (this.move.down.count > this.move.down.amplitude) {
            this.resetHeroMove('down');
        }

        this.hero.coord.dy = this.move.down.pressed
            ? ctx.canvas.height - lvl.heroShiftY + 10
            : (
                ctx.canvas.height - lvl.heroShiftY - this.move.jump.position
            );

        ctx.drawImage(
            hero,
            0,
            this.move.down.pressed ? this.hero.coord.dHeight : 0,
            this.hero.coord.sWidth,
            this.hero.coord.sHeight,
            this.hero.coord.dx,
            this.hero.coord.dy,
            this.hero.coord.dWidth,
            this.hero.coord.dHeight,
        );

        if (keyPress === CONTROLS.shot && this.hero.ideas) {
            this.hero.shots.push({
                dx: this.hero.coord.dx + this.hero.coord.dWidth,
                dy: this.hero.coord.dy + 35,
                dWidth: 30,
                dHeight: 30,
            });

            this.hero.ideas--;
        }

        this.levels.timer++;
    }

    drawTimer(
        { ctx }: DrawCanvasPartProps,
    ) {
        const score = calcScore(this.levels.timer);
        const center = ctx.canvas.width / 2 - ctx.measureText(String(score)).width / 2;

        ctx.font = '48px serif';
        ctx.fillText(String(score), center, 60);

        this.levels.timer++;
    }

    drawCanvas(
        options: DrawCanvasProps,
        gameOverFn: FnActionRequiredProps<StoreGameProps>,
        gamePauseFn: FnActionRequiredProps<StoreGameProps>,
    ) {
        const { ctx, resources } = options;

        if (!resources) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.checkEncounters(gameOverFn, gamePauseFn);
        this.drawBg(options);
        this.drawHero(options);
        this.drawLifes(options);
        this.drawIdeas(options);
        this.drawExplosion(options);
        this.drawShote(options);
        this.restoreIdeas(options);
        this.generateEnemies(options);
        this.drawEnemies(options);
        this.drawTimer(options);
    }
}
