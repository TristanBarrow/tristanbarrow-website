import { useSubscription } from '../../useSubscription';

export const useWorkoutSetsData = () => {
    return useSubscription({
        route: '/api/workoutSets',
        queryKey: 'get-workoutSets'
    });
}
