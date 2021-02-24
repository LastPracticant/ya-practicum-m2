import { CanvasImageCoordinatesProps } from './GameCanvas.config';

type ExcludedProps = 'sx' | 'sy' | 'sWidth' | 'sHeight';

export const getTexturePosition = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => ({
    topLeft: [
        texture.dx,
        texture.dy,
    ],
    topRight: [
        texture.dx + texture.dWidth,
        texture.dy,
    ],
    bottomLeft: [
        texture.dx,
        texture.dy + texture.dHeight,
    ],
    bottomRight: [
        texture.dx + texture.dWidth,
        texture.dy + texture.dHeight,
    ],
    center: [
        texture.dx + texture.dWidth / 2,
        texture.dy + texture.dHeight / 2,
    ],
    topCenter: [
        texture.dx + texture.dWidth / 2,
        texture.dy,
    ],
    bottomCenter: [
        texture.dx + texture.dWidth / 2,
        texture.dy + texture.dHeight,
    ],
});

export const isHaveBulletEncounter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    firstTexture: T,
    secondTexture: T,
) => {
    const firstObjPosition = getTexturePosition(firstTexture);
    const secondObjPosition = getTexturePosition(secondTexture);

    const encX = firstObjPosition.topRight[0] > secondObjPosition.topCenter[0]
        && firstObjPosition.topRight[0] < secondObjPosition.topRight[0];
    const encYTop = firstObjPosition.topRight[1] > secondObjPosition.topLeft[1]
        && firstObjPosition.topRight[1] < secondObjPosition.bottomLeft[1];
    const encYBottom = firstObjPosition.bottomLeft[1] > secondObjPosition.topLeft[1]
        && firstObjPosition.bottomLeft[1] < secondObjPosition.bottomLeft[1];

    return encX && (encYTop || encYBottom);
};

export const isHaveHeroEncounter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    firstTexture: T,
    secondTexture: T,
) => {
    const firstObjPosition = getTexturePosition(firstTexture);
    const secondObjPosition = getTexturePosition(secondTexture);

    const encdX = firstObjPosition.topCenter[0] > secondObjPosition.topLeft[0]
        && firstObjPosition.topCenter[0] < secondObjPosition.topRight[0];
    const encYTop = firstObjPosition.topRight[1] > secondObjPosition.topLeft[1]
        && firstObjPosition.topRight[1] < secondObjPosition.bottomLeft[1];
    const encYBottom = firstObjPosition.bottomLeft[1] > secondObjPosition.topLeft[1]
        && firstObjPosition.bottomLeft[1] < secondObjPosition.bottomLeft[1];

    return encdX && (encYTop || encYBottom);
};

export const drawImage = (
    texture: HTMLImageElement,
    coords: CanvasImageCoordinatesProps,
    ctx: CanvasRenderingContext2D,
) => {
    ctx.drawImage(
        texture,
        coords.sx,
        coords.sy,
        coords.sWidth,
        coords.sHeight,
        coords.dx,
        coords.dy,
        coords.dWidth,
        coords.dHeight,
    );
};
