import React, { useEffect } from 'react';
import { gameSelector } from 'client/core/store';
import { useSelector } from 'react-redux';
import { DrawCanvasFn, useCanvas } from './GameCanvas.hooks';
import { CanvasResourcesProps } from './ResourcesLoader';

interface GameCanvasProps
    extends React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement
    > {
    drawCanvas: DrawCanvasFn
    resources?: CanvasResourcesProps
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
    drawCanvas,
    resources,
    ...restProps
}) => {
    const canvasRef = useCanvas(drawCanvas, resources);

    const { game: gameState } = useSelector(gameSelector);

    useEffect(() => {
        if (document.fullscreenElement && (gameState.isOver || gameState.isPause)) {
            document.exitFullscreen();
        }
    }, [gameState]);

    const handleSetFullScreen = () => {
        if (canvasRef?.current) {
            canvasRef.current.requestFullscreen();
        }
    };

    return <canvas ref={canvasRef} {...restProps} onDoubleClick={handleSetFullScreen} />;
};
