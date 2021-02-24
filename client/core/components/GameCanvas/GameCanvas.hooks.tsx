import { ROUTES } from 'client/routing';
import { FnActionProps } from 'client/shared/types';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { ANIMATION, CONTROLS } from './GameCanvas.config';
import { DrawCanvasProps } from './GamePainter';
import { CanvasResourcesProps, ResourcesLoader, ResourcesProps } from './ResourcesLoader';

export type DrawCanvasFn = (props: DrawCanvasProps, gameOverFn?: FnActionProps) => void;

export const useCanvas = (drawCanvas: DrawCanvasFn, resources?: CanvasResourcesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const history = useHistory();

    const handleGameOver = () => {
        history.push(ROUTES.GAME_OVER.path);
    };

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

            if (![CONTROLS.jump, CONTROLS.down].includes(e.code)) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleHeroAction, false);

        const renderCanvas = (loadedResources?: ResourcesProps) => {
            const time = performance.now();
            const shiftTime = time - startTime;
            const shift = (shiftTime / animationTime) * ANIMATION.speedMultiplier;
            frameCount++;

            drawCanvas({
                ctx,
                shift,
                resources: loadedResources,
                keyPress,
                frameCount,
            }, handleGameOver);

            keyPress = null;

            animationFrameId = window.requestAnimationFrame(() => {
                renderCanvas(loadedResources);
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
