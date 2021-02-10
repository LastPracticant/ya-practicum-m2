import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
    fallbackComponent?: ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallbackComponent
                ? this.props.fallbackComponent
                : <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
    }
}
