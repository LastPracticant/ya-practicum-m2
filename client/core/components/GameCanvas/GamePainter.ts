import { CONTROLS } from './GameCanvas.config';
import { ResourcesProps } from './ResourcesLoader';

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D
    frameCount: number
    keyPress?: string | null
    shift?: number
    resources?: ResourcesProps
}

interface MoveOptionsProps {
    pressed: boolean
    count: number
    length: number
    height: number
}

interface MoveProps {
    [key: string]: MoveOptionsProps
}

interface ShoteProps {
    x: number
    y: number
}

interface EnemiesProps {
    x: number
    y: number
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    move: MoveProps = {
        jump: {
            pressed: false,
            count: 0,
            length: 50,
            height: 0,
        },
        down: {
            pressed: false,
            count: 0,
            length: 20,
            height: 0,
        },
    };

    explosion = {
        shiftX: 0,
        shiftY: 0,
        width: 120,
        height: 90,
    };

    enemies = {
        tickCounter: 0,
        set: [] as EnemiesProps[],
    };

    hero = {
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
        shotes: [] as ShoteProps[],
    };

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

    // TODO: доработать в LP-41
    drawEnemies({
        ctx,
        resources,
    }: DrawCanvasPartProps) {
        if (!resources) return;

        const { enemies } = resources;

        this.enemies.set.forEach((enemy) => {
            ctx.drawImage(enemies, 0, 0, 90, 90, enemy.x, enemy.y, 90, 90);
        });

        if (this.enemies.tickCounter < 100) {
            this.enemies.tickCounter++;

            this.enemies.set.push({
                x: 300,
                y: ctx.canvas.height - this.hero.position.y,
            });
        }

        this.enemies.tickCounter = 0;

        if (this.enemies.set.length > 20) {
            this.enemies.set = [];
        }
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
        this.drawEnemies(options);
    }
}
