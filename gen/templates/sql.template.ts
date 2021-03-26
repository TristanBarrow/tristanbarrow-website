import { ConfigObject } from '../config';
import { Template } from '../types/Template'
import { cap } from '../util/cap';

export const generateSql = (config: ConfigObject): Template => {
    const name = config.name;
    const db = config.props.map(prop => `    ${prop.name} ${prop.dbType.valueOf()},`).join('\n');
    const template = `CREATE TABLE ${name}s(
    id SERIAL PRIMARY KEY,
${db}
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);`;
    return {
        location: ['src', 'backend', 'sql', `${name}.sql`],
        template,
    };

}