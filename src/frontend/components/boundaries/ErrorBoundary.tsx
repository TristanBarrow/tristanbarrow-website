import React from 'react';

type ErrorBoundaryProps = {
    error: Error
}

const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
    return (
        <div>Error: {error.message}</div>
    )
}

export default ErrorBoundary;