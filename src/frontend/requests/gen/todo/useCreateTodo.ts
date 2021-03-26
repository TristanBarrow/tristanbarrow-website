import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { CreateTodoRequest } from '../../../../types/network/gen/todo';

export const useCreateTodo = () => {
    return useRequest<CreateTodoRequest, ResponseMessage>({
        route: '/api/todos/create',
        method: RequestMethod.POST,
    });
}
