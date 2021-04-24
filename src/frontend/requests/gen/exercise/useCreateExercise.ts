import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { CreateExerciseRequest } from '../../../../types/network/gen/exercise';

export const useCreateExercise = () => {
    return useRequest<CreateExerciseRequest, ResponseMessage>({
        route: '/api/exercises/create',
        method: RequestMethod.POST,
    });
}