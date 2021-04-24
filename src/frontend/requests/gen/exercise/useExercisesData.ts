import { useSubscription } from '../../useSubscription';

export const useExercisesData = () => {
    return useSubscription({
        route: '/api/exercises',
        queryKey: 'get-exercises'
    });
}
