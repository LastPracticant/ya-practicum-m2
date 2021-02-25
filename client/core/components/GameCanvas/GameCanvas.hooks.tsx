import { gameSelector, StoreGameProps } from 'client/core/store';
import { gameOverAction } from 'client/core/store/actions/game.actions';
import { FnActionRequaredProps } from 'client/shared/types';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ANIMATION, CONTROLS } from './GameCanvas.config';
import { DrawCanvasProps } from './GamePainter';
import { CanvasResourcesProps, ResourcesLoader, ResourcesProps } from './ResourcesLoader';

export type DrawCanvasFn = (
    props: DrawCanvasProps, gameOverFn?: FnActionRequaredProps<StoreGameProps>
) => void;

export const useCanvas = (drawCanvas: DrawCanvasFn, resources?: CanvasResourcesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { game: gameState } = useSelector(gameSelector);
    const dispatch = useDispatch();

    const handleGameOver = (payload: StoreGameProps) => {
        dispatch(gameOverAction(payload));
    };

    useEffect(() => {
        if (gameState.isOver) return;

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

            if (![CONTROLS.jump, CONTROLS.down, CONTROLS.shot].includes(e.code)) {
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
    }, [gameState]);

    return canvasRef;
};
