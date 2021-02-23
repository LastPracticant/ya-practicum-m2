import { getRandomIntInclusive } from 'client/shared/utils';
import { CONTROLS, EnemyTypeProps, GAME_OPTIONS } from './GameCanvas.config';
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
        const basePosition = ctx.canvas.height - this.hero.position.y;
        const airUnits = basePosition - 60;
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
            sx: (randomEnemyNumber - 1) * enemiesTypes[randomEnemyType].unitWidth,
            sy: enemiesTypes[randomEnemyType].sy,
            sWidth: enemiesTypes[randomEnemyType].unitWidth,
            sHeight: enemiesTypes[randomEnemyType].unitHeight,
            dx: this.enemies.army.length
                ? ctx.canvas.width + getRandomIntInclusive(0, 100)
                : ctx.canvas.width,
            dy: this.calculateEnemiesDY(enemiesTypes[randomEnemyType], ctx),
            dWidth: enemiesTypes[randomEnemyType].unitWidth,
            dHeight: enemiesTypes[randomEnemyType].unitHeight,
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
            ctx.drawImage(
                enemies,
                coord.sx,
                coord.sy,
                coord.sWidth,
                coord.sHeight,
                coord.dx,
                coord.dy,
                coord.dWidth,
                coord.dHeight,
            );

            this.enemies.army[index].dx -= this.hero.bulletSpeed;
        });
    }

    drawExplosion({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { explosion } = resources;

        /** Длина за вычетом 1 кадра. Полная длина 1500. */
        const spriteWidth = 1200;
        /** Длина кадра. */
        const frameWidth = 300;
        /** Высота за вычетом 1 кадра. Полная высота 1000. */
        const spriteHeight = 800;
        /** Высота кадра. */
        const frameHeight = 200;

        if (this.explosion.shiftX === spriteWidth) {
            this.explosion.shiftX = 0;
            this.explosion.shiftY += frameHeight;
        } else {
            this.explosion.shiftX += frameWidth;
        }

        if (this.explosion.shiftY === spriteHeight) {
            this.explosion.shiftY = 0;
        }

        ctx.drawImage(
            explosion,
            this.explosion.shiftX,
            this.explosion.shiftY,
            frameWidth,
            frameHeight,
            500,
            ctx.canvas.height - this.hero.position.x,
            this.explosion.width,
            this.explosion.height,
        );
    }

    drawShote({ ctx, resources }: DrawCanvasPartProps) {
        if (!resources) return;

        const { idea } = resources;

        this.hero.shotes.forEach((shote, index) => {
            ctx.drawImage(
                idea,
                shote.x,
                shote.y,
                30,
                30,
            );

            this.hero.shotes[index].x += this.hero.bulletSpeed;
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
            this.drawHeroMove('down');
        }

        if (this.move.jump.count > this.move.jump.length) {
            this.resetHeroMove('jump');
        }

        if (this.move.down.count > this.move.down.length) {
            this.resetHeroMove('down');
        }

        this.hero.currentPosition.y = (
            ctx.canvas.height - this.hero.position.y - this.move.jump.height + this.move.down.height
        );

        ctx.drawImage(
            hero,
            this.hero.position.x,
            this.hero.currentPosition.y,
            this.hero.width,
            this.hero.height,
        );

        if (keyPress === CONTROLS.shote) {
            this.hero.shotes.push({
                x: this.hero.position.x + this.hero.width,
                y: this.hero.currentPosition.y + 35,
            });
        }
    }

    drawCanvas(options: DrawCanvasProps) {
        const { ctx, resources } = options;

        if (!resources) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
