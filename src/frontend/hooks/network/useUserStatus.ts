import { useQuery } from 'react-query';
import { QueryResult } from './QueryResult';

type UserStatus = {
    success: boolean
    user?: string
    isAdmin?: boolean
    message?: string 
}

export const useUserStatus = (): QueryResult<UserStatus> => {
    return useQuery('repoData', () =>
        fetch('/api/user/status').then(res =>res.json())
    );
}