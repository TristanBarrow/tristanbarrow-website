import { useState } from "react";
import { useQuery } from 'react-query';

export const useLoginRequest = () => {
    const [response, setResponse] = useState(null as any);

    const login = (username: string, password: string): void => {
        const fullRoute = '/api/login';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        const request = new Request(fullRoute, {
            method: 'POST',
            headers,
            mode: 'same-origin',
            body: JSON.stringify({username, password}),
        });
    
        fetch(request)
            .then((res: Response) => setResponse(res.json()))
    }

    return {
        login,
        response
    }
}