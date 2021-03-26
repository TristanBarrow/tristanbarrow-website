import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { DeleteTodoRequest } from '../../../../types/network/gen/todo';

export const useDeleteTodo = () => {
    return useRequest<DeleteTodoRequest, ResponseMessage>({
        route: '/api/todos/delete',
        method: RequestMethod.DELETE,
    });
}
