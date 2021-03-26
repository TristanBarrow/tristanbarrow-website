import { ConfigObject } from '../config';
import { Template } from '../types/Template'
import { cap } from '../util/cap';

export const generateNetworkTypes = (config: ConfigObject): Template => {
    const name = config.name;
    const types = config.props.map(prop => `    ${prop.name}: ${prop.tsType.valueOf()}`).join('\n');
    const template = `export type Create${cap(name)}Request = {
${types}
}

export type Update${cap(name)}Request = {
    id: number
${types}
}

export type Delete${cap(name)}Request = {
    id: number
}`;

    return {
        location: ['src', 'types', 'network', 'gen', `${name}.ts`],
        template,
    };

}