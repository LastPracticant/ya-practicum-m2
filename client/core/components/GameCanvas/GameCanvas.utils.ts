import { CanvasImageCoordinatesProps } from './GameCanvas.config';

type ExcludedProps = 'sx' | 'sy' | 'sWidth' | 'sHeight';

export const getTopLeft = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx,
    texture.dy,
];

export const getTopRight = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx + texture.dWidth,
    texture.dy,
];

export const getBottomLeft = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx,
    texture.dy + texture.dHeight,
];

export const getBottomRight = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx + texture.dWidth,
    texture.dy + texture.dHeight,
];

export const getCenter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx + texture.dWidth / 2,
    texture.dy + texture.dHeight / 2,
];

export const getTopCenter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx + texture.dWidth / 2,
    texture.dy,
];

export const getBottomCenter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    texture: T,
) => [
    texture.dx + texture.dWidth / 2,
    texture.dy + texture.dHeight,
];

export const isHaveBulletEncounter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    firstObj: T,
    secondObj: T,
) => {
    const encX = getTopRight(firstObj)[0] > getTopCenter(secondObj)[0]
        && getTopRight(firstObj)[0] < getTopRight(secondObj)[0];
    const encYTop = getTopRight(firstObj)[1] > getTopLeft(secondObj)[1]
        && getTopRight(firstObj)[1] < getBottomLeft(secondObj)[1];
    const encYBottom = getBottomLeft(firstObj)[1] > getTopLeft(secondObj)[1]
        && getBottomLeft(firstObj)[1] < getBottomLeft(secondObj)[1];

    return encX && (encYTop || encYBottom);
};

export const isHaveHeroEncounter = <T extends Omit<CanvasImageCoordinatesProps, ExcludedProps>>(
    firstObj: T,
    secondObj: T,
) => {
    const encdX = getTopCenter(firstObj)[0] > getTopLeft(secondObj)[0]
        && getTopCenter(firstObj)[0] < getTopRight(secondObj)[0];
    const encYTop = getTopRight(firstObj)[1] > getTopLeft(secondObj)[1]
        && getTopRight(firstObj)[1] < getBottomLeft(secondObj)[1];
    const encYBottom = getBottomLeft(firstObj)[1] > getTopLeft(secondObj)[1]
        && getBottomLeft(firstObj)[1] < getBottomLeft(secondObj)[1];

    return encdX && (encYTop || encYBottom);
};
