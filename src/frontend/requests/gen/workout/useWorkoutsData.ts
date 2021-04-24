import { useSubscription } from '../../useSubscription';

export const useWorkoutsData = () => {
    return useSubscription({
        route: '/api/workouts',
        queryKey: 'get-workouts'
    });
}
