import { FnActionProps } from 'client/shared/types';
import {
    RefObject, useCallback, useEffect, useRef, useState,
} from 'react';

export interface UseElementVisibleResultProps {
    elementVisible: boolean
    handleChangeElementVisible: FnActionProps
    setElementVisible: React.Dispatch<React.SetStateAction<boolean>>
    toggleElementVisibleRef: RefObject<HTMLDivElement>
    elementRef: RefObject<HTMLDivElement>
}

/**
 * Хук для переключения видимости элемента, с учетом клика за пределами
 * переключателя, а также самого элемента
 */
export function useElementVisible(initialState = false): UseElementVisibleResultProps {
    const [elementVisible, setElementVisible] = useState(initialState);
    const toggleElementVisibleRef = useRef<HTMLDivElement>(null);
    const elementRef = useRef<HTMLDivElement>(null);

    /**
     * Переключатель видимости элемента
     */
    const handleChangeElementVisible = useCallback(() => {
        setElementVisible((visible) => !visible);
    }, []);

    /**
     * Обработчик клика за пределами переключателя видимости элемента
     * @param event - объект события
     */
    const handleClickOutsideElementToggle = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!toggleElementVisibleRef.current || !elementRef.current) return;

            const isToggleContainsTarget = toggleElementVisibleRef.current.contains(
                event.target as Node,
            );
            const isElementContainsTarget = elementRef.current.contains(
                event.target as Node,
            );

            if (!isToggleContainsTarget && !isElementContainsTarget) {
                setElementVisible(false);
            }
        },
        [],
    );

    /**
     * Подписка/отписка на события клика по документу
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideElementToggle);
        document.addEventListener('touchstart', handleClickOutsideElementToggle);

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutsideElementToggle,
            );
            document.removeEventListener(
                'touchstart',
                handleClickOutsideElementToggle,
            );
        };
    }, [handleClickOutsideElementToggle]);

    return {
        elementVisible,
        handleChangeElementVisible,
        setElementVisible,
        toggleElementVisibleRef,
        elementRef,
    };
}
