import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { UpdateWorkoutSetRequest } from '../../../../types/network/gen/workoutSet';

export const useUpdateWorkoutSet = () => {
    return useRequest<UpdateWorkoutSetRequest, ResponseMessage>({
        route: '/api/workoutSets/update',
        method: RequestMethod.PUT,
    });
}