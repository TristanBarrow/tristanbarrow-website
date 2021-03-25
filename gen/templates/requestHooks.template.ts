import { ConfigObject } from '../config';
import { Template } from '../types/Template'

const cap = (str: string) => {
    str.charAt(0).toUpperCase() + str.slice(1);
}

export const requestHooksTempl = (config: ConfigObject): Template[] => {
    const name = config.name;
    let requests: GenerateRequestHookArgs[] = [];
    if (config.crud.all || !!config.crud.create) {
        requests.push({
            name,
            type: 'create',
            verb: 'POST',
        });
    }
    if (config.crud.all || !!config.crud.update) {
        requests.push({
            name,
            type: 'update',
            verb: 'PUT'
        });
    }
    if (config.crud.all || !!config.crud.remove) {
        requests.push({
            name,
            type: 'delete',
            verb: 'DELETE'
        });
    }

    return requests.map(request => generateRequestHook(request))
}

type GenerateRequestHookArgs = {
    name: string
    type: string
    verb: string
}

const generateRequestHook = ({
    name,
    type,
    verb,
}: GenerateRequestHookArgs): Template => {
    const template = `import { useRequest } from '../../useRequest';
import { RequestMethod } from '../../../../types/network/RequestMethod';
import { ResponseMessage } from '../../../../types/network/ResponseMessage';
import { ${type}${cap(name)}Request } from '../../../../types/network/gen/${name}';

export const use${cap(type)}${cap(name)} = () => {
    return useRequest<${cap(type)}${cap(name)}Request, ResponseMessage>({
        route: '/api/${name}s/${type}',
        method: RequestMethod.${verb},
    });
}
`;

    return {
        location: ['src', 'frontend', 'requests', 'gen', `use${cap(type)}${cap(name)}.ts`],
        template
    }
}

