import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { DeleteWorkoutSetRequest } from '../../../../types/network/gen/workoutSet';

export const useDeleteWorkoutSet = () => {
    return useRequest<DeleteWorkoutSetRequest, ResponseMessage>({
        route: '/api/workoutSets/delete',
        method: RequestMethod.DELETE,
    });
}