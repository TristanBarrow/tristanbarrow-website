import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { DeleteProjectRequest } from '../../../../types/network/gen/project';

export const useDeleteProject = () => {
    return useRequest<DeleteProjectRequest, ResponseMessage>({
        route: '/api/projects/delete',
        method: RequestMethod.DELETE,
    });
}