export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D
    frameCount: number
    keyPress?: string | null
    shift?: number
    resources?: HTMLImageElement[]
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

export interface DrawCanvasPartProps extends Omit<DrawCanvasProps, 'resources'> {
    resource: HTMLImageElement
}

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

    heroPositionXY = 210;

    heroSizes = {
        width: 75,
        height: 80,
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
        resource,
        shift = 0,
    }: DrawCanvasPartProps) {
        const calculateShift = shift % (resource.width / 2);

        ctx.drawImage(resource, 0 - calculateShift, 0, resource.width, ctx.canvas.height);
    }

    drawHero({ ctx, resource, keyPress }: DrawCanvasPartProps) {
        if (keyPress === 'ArrowUp') {
            if (!this.move.down.pressed) this.move.jump.pressed = true;
        }

        if (keyPress === 'ArrowDown') {
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

        const heroPositionY = (
            ctx.canvas.height - this.heroPositionXY - this.move.jump.height + this.move.down.height
        );

        ctx.drawImage(
            resource,
            this.heroPositionXY,
            heroPositionY,
            this.heroSizes.width,
            this.heroSizes.height,
        );
    }

    drawCanvas({
        ctx,
        shift,
        resources,
        keyPress,
        frameCount,
    }: DrawCanvasProps) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!resources) return;

        const [bg5, hero] = resources;

        this.drawBg({
            ctx,
            shift,
            resource: bg5,
            frameCount,
        });
        this.drawHero({
            ctx,
            shift,
            resource: hero,
            keyPress,
            frameCount,
        });
    }
}
