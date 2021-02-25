import { getRandomIntInclusive } from 'client/shared/utils';
import { CONTROLS, EnemyTypeProps, GAME_OPTIONS } from './GameCanvas.config';
import { drawImage, isHaveBulletEncounter, isHaveHeroEncounter } from './GameCanvas.utils';
import { ResourcesProps } from './ResourcesLoader';

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D
    frameCount: number
    keyPress?: string | null
    shift?: number
    resources?: ResourcesProps
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    move = GAME_OPTIONS.move;

    explosion = GAME_OPTIONS.explosion;

    enemies = GAME_OPTIONS.enemies;

    hero = GAME_OPTIONS.hero;

    levels = [
        {
            enemies: [0, 1, 4],
        },
    ];

    currentLevel = 0;

    constructor() {
        this.drawBg = this.drawBg.bind(this);
        this.drawHero = this.drawHero.bind(this);
        this.drawCanvas = this.drawCanvas.bind(this);
    }

    drawHeroMove(moveKey: string) {
        this.move[moveKey].count++;

        this.move[moveKey].height = 4 * this.move[moveKey].length * Math.sin(
            (Math.PI * this.move[moveKey].count) / this.move[moveKey].length,
        );
    }

    resetHeroMove(moveKey: string) {
        this.move[moveKey].count = 0;
        this.move[moveKey].pressed = false;
        this.move[moveKey].height = 0;
    }

    drawBg({
        ctx,
        resources,
        shift = 0,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { bg5 } = resources;

        const calculateShift = shift % (bg5.width / 2);

        ctx.drawImage(bg5, 0 - calculateShift, 0, bg5.width, ctx.canvas.height);
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
        const basePosition = ctx.canvas.height - this.hero.shiftY;
        const airUnits = basePosition - 80;
        const earthUnits = basePosition + 10;

        switch (enemy.type) {
        case 'companyAir':
            return airUnits;
        case 'technologyAir':
            return airUnits;
        default:
            return earthUnits;
        }
    }

    generateEnemies({
        ctx,
    }: DrawCanvasProps) {
        const levelEnemies = this.levels[this.currentLevel].enemies;
        const enemiesTypes = this.enemies.types;
        const randomEnemyType = levelEnemies[getRandomIntInclusive(0, levelEnemies.length - 1)];
        const calcEnemy = enemiesTypes[randomEnemyType];
        const randomEnemyNumber = getRandomIntInclusive(
            1, calcEnemy.sWidth / calcEnemy.unitWidth,
        );

        if (this.enemies.tickCounter < this.enemies.frequency) {
            this.enemies.tickCounter++;

            return;
        }

        this.enemies.army.push({
            sx: (randomEnemyNumber - 1) * calcEnemy.unitWidth,
            sy: calcEnemy.sy,
            sWidth: calcEnemy.unitWidth,
            sHeight: calcEnemy.unitHeight,
            dx: this.enemies.army.length
                ? ctx.canvas.width + getRandomIntInclusive(0, 100)
                : ctx.canvas.width,
            dy: this.calculateEnemiesDY(calcEnemy, ctx),
            dWidth: calcEnemy.unitWidth,
            dHeight: calcEnemy.unitHeight,
        });

        if (this.enemies.army.length > 20) {
            this.enemies.army.splice(0, this.enemies.army.length / 2);
        }

        this.enemies.tickCounter = 0;
    }

    drawEnemies({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { enemies } = resources;

        this.enemies.army.forEach((coord, index) => {
            drawImage(enemies, coord, ctx);

            this.enemies.army[index].dx -= this.hero.bulletSpeed;
        });
    }

    checkEncounters() {
        const anemyExplosionShiftY = 30;
        const heroExplosionShiftY = 5;

        this.enemies.army.forEach((enemy, i) => {
            /** Столкновение врагов со снарядами */
            this.hero.shotes.forEach((shote, j) => {
                if (isHaveBulletEncounter(shote, enemy)) {
                    this.explosion.encounters.push({
                        ...this.explosion.cutOptions,
                        dx: shote.dx,
                        dy: shote.dy - anemyExplosionShiftY,
                    });
                    this.enemies.army.splice(i, 1);
                    this.hero.shotes.splice(j, 1);
                }
            });

            /** Столкновение врагов с главным героем */
            if (isHaveHeroEncounter(this.hero.coord, enemy)) {
                this.explosion.encounters.push({
                    ...this.explosion.cutOptions,
                    dx: this.hero.coord.dx,
                    dy: this.hero.coord.dy - heroExplosionShiftY,
                });
                this.enemies.army.splice(i, 1);
            }
        });
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

    drawShote({ ctx, resources }: DrawCanvasPartProps) {
        if (!resources) return;

        const { idea } = resources;

        this.hero.shotes.forEach((shote, index) => {
            ctx.drawImage(
                idea,
                shote.dx,
                shote.dy,
                30,
                30,
            );

            this.hero.shotes[index].dx += this.hero.bulletSpeed;
        });
    }

    drawHero({
        ctx,
        resources,
        keyPress,
    }: DrawCanvasPartProps) {
        if (!resources) return;

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

        if (this.move.jump.count > this.move.jump.length) {
            this.resetHeroMove('jump');
        }

        if (this.move.down.count > this.move.down.length) {
            this.resetHeroMove('down');
        }

        this.hero.coord.dy = this.move.down.pressed
            ? ctx.canvas.height - this.hero.shiftY + 10
            : (
                ctx.canvas.height - this.hero.shiftY - this.move.jump.height + this.move.down.height
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

        if (keyPress === CONTROLS.shote) {
            this.hero.shotes.push({
                dx: this.hero.coord.dx + this.hero.coord.dWidth,
                dy: this.hero.coord.dy + 35,
                dWidth: 30,
                dHeight: 30,
            });
        }
    }

    drawCanvas(options: DrawCanvasProps) {
        const { ctx, resources } = options;

        if (!resources) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.checkEncounters();
        this.drawBg(options);
        this.drawHero(options);
        this.drawLifes(options);
        this.drawIdeas(options);
        this.drawExplosion(options);
        this.drawShote(options);
        this.generateEnemies(options);
        this.drawEnemies(options);
    }
}
