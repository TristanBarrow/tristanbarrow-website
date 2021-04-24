import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { UpdateWorkoutRequest } from '../../../../types/network/gen/workout';

export const useUpdateWorkout = () => {
    return useRequest<UpdateWorkoutRequest, ResponseMessage>({
        route: '/api/workouts/update',
        method: RequestMethod.PUT,
    });
}