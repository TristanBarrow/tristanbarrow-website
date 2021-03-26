import { useSubscription } from '../../useSubscription';

export const useProjectsData = () => {
    return useSubscription({
        route: '/api/projects',
        queryKey: 'get-projects'
    });
}
