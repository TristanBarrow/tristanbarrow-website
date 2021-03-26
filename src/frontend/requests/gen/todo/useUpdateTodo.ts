import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { UpdateTodoRequest } from '../../../../types/network/gen/todo';

export const useUpdateTodo = () => {
    return useRequest<UpdateTodoRequest, ResponseMessage>({
        route: '/api/todos/update',
        method: RequestMethod.PUT,
    });
}