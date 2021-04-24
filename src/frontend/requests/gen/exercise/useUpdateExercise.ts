import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { UpdateExerciseRequest } from '../../../../types/network/gen/exercise';

export const useUpdateExercise = () => {
    return useRequest<UpdateExerciseRequest, ResponseMessage>({
        route: '/api/exercises/update',
        method: RequestMethod.PUT,
    });
}