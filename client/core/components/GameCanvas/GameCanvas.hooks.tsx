import { useEffect, useRef } from 'react';
import { ANIMATION } from './GameCanvas.config';
import { DrawCanvasProps } from './GamePainter';
import { ResourcesLoader } from './ResourcesLoader';

export type DrawCanvasFn = (props: DrawCanvasProps) => void;

export const useCanvas = (drawCanvas: DrawCanvasFn, resources?: string | string[]) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!ctx) return;

        const startTime = performance.now();
        const animationTime = ANIMATION.time;
        let animationFrameId: number;
        let frameCount = 0;

        let keyPress: string | null;
        const handleHeroAction = (e: KeyboardEvent) => {
            keyPress = e.code;
        };
        document.addEventListener('keydown', handleHeroAction, false);

        const renderCanvas = (images?: HTMLImageElement[]) => {
            const time = performance.now();
            const shiftTime = time - startTime;
            const shift = (shiftTime / animationTime) * ANIMATION.speedMultiplier;
            frameCount++;

            drawCanvas({
                ctx,
                shift,
                resources: images,
                keyPress,
                frameCount,
            });

            keyPress = null;

            animationFrameId = window.requestAnimationFrame(() => {
                renderCanvas(images);
            });
        };

        if (resources) {
            ResourcesLoader.onReady(renderCanvas);
            ResourcesLoader.load(resources);
        } else {
            renderCanvas();
        }

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            document.removeEventListener('keydown', handleHeroAction, false);
        };
    }, []);

    return canvasRef;
};
