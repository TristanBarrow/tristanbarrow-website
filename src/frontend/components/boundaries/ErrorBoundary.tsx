import React from 'react';
import { ResponseMessage } from '../../../types/network/ResponseMessage';

type ErrorBoundaryProps = {
    error: ResponseMessage
}

const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
    return (
        <div>Error: {error.message}</div>
    )
}

export default ErrorBoundary;