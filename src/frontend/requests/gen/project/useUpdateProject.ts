import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { UpdateProjectRequest } from '../../../../types/network/gen/project';

export const useUpdateProject = () => {
    return useRequest<UpdateProjectRequest, ResponseMessage>({
        route: '/api/projects/update',
        method: RequestMethod.PUT,
    });
}