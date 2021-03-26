import { ConfigObject } from '../config';
import { Template } from '../types/Template'
import { cap } from '../util/cap';

export const generateSubscriptionHooks = (config: ConfigObject): Template => {
    const name = config.name;
    const template = `import { useSubscription } from '../../useSubscription';

export const use${cap(name)}sData = () => {
    return useSubscription({
        route: '/api/${name}s',
        queryKey: 'get-${name}s'
    });
}
`;
    return {
        location: ['src', 'frontend', 'requests', 'gen', name, `use${cap(name)}sData.ts`],
        template,
    };

}