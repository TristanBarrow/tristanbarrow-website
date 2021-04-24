import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { CreateWorkoutRequest } from '../../../../types/network/gen/workout';

export const useCreateWorkout = () => {
    return useRequest<CreateWorkoutRequest, ResponseMessage>({
        route: '/api/workouts/create',
        method: RequestMethod.POST,
    });
}