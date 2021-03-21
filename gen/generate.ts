import { writeFileSync } from 'fs';

const generate = (name: string, props: {[key: string]: string}) => {
    const capedName = name.charAt(0).toUpperCase() + name.slice(1);

    const dbConnection: string = Object.keys(props).map((key: string) => {
        return `                ${key}: row.${key},`
    }).join('\n');

    const dbCreate: string = Object.keys(props).map((key: string) => {
        return `    ${key} ${props[key]}`;
    }).join(',\n');



    return `

const ${name} = require(\`\${server_path}${name}.js\`);
${name}(app);


// database start
const pool = require('./pool.js');

const getAll${capedName}s = (callback) => {
    const query = 'SELECT * FROM ${name};';
    pool.query(query, null, (err, result) => {
        const rows = result.rows.map(row => {
            return {
                id: row.id,
${dbConnection}
            }
        });
        callback(err, rows);
    });
}

export default {
    getAll${capedName}s
}
/// database end

// endpoints start
const ${name} = require('../database/${name}.js');
const auth = require('../../middleware/auth.js');

export default (app) => {
    app.get('/api/${name}s', auth.std, (req, res) => {
        ${name}.getAll${capedName}s((err, ${name}s) => {
            if (err) {
                console.error(err);
                res.json({success: false, message: 'An unknown error has occurred, contact the admin' });
                throw new Error(err);
            } else {
                res.json(${name}s);
            }
        });
    });

}
// endpoints end

// sql start
CREATE TABLE ${name}(
    id SERIAL PRIMARY KEY,
${dbCreate}
);
// sql end
`;
}

generate('newThing', {
    name: 'VARCHAR(255) NOT NULL',
    age: 'SMALLINT',
});