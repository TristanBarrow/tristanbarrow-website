import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { CreateProjectRequest } from '../../../../types/network/gen/project';

export const useCreateProject = () => {
    return useRequest<CreateProjectRequest, ResponseMessage>({
        route: '/api/projects/create',
        method: RequestMethod.POST,
    });
}