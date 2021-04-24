import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { CreateWorkoutSetRequest } from '../../../../types/network/gen/workoutSet';

export const useCreateWorkoutSet = () => {
    return useRequest<CreateWorkoutSetRequest, ResponseMessage>({
        route: '/api/workoutSets/create',
        method: RequestMethod.POST,
    });
}