import { useSubscription } from '../../useSubscription';

export const useTodosData = () => {
    return useSubscription({
        route: '/api/todos',
        queryKey: 'get-todos'
    });
}
