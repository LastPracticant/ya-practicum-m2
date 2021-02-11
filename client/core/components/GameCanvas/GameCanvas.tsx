import React from 'react';
import { DrawCanvasFn, useCanvas } from './GameCanvas.hooks';

interface GameCanvasProps
    extends React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement
    > {
    drawCanvas: DrawCanvasFn
    resources?: string | string[]
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
    drawCanvas, resources, ...restProps
}) => {
    const canvasRef = useCanvas(drawCanvas, resources);

    return <canvas ref={canvasRef} {...restProps} />;
};
