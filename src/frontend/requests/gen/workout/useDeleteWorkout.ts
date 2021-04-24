import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { DeleteWorkoutRequest } from '../../../../types/network/gen/workout';

export const useDeleteWorkout = () => {
    return useRequest<DeleteWorkoutRequest, ResponseMessage>({
        route: '/api/workouts/delete',
        method: RequestMethod.DELETE,
    });
}