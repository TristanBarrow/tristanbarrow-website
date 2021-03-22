import { writeFileSync } from 'fs';
import config from './config';
import all from './templates/all.template';
import { getHomeDir } from './util/getHomeDir';
import { generateEndpoint } from './templates/endpoints.template';
import { generateDatabaseAccess } from './templates/databaseAcess.template';

const buildPath = (homeArray: string[], location: string[]) => {
    return homeArray.concat(location).join('/');
}

const homeArray = getHomeDir();

const names = config.map(option => option.name);
const allTemplate = all(names);
const allLocation = homeArray.concat(allTemplate.location);
writeFileSync(allLocation.join('/'), allTemplate.template);

const endpointTemplates = config.map(endpoint => generateEndpoint(endpoint));
const databaseAccessTemplates = config.map(endpoint => generateDatabaseAccess(endpoint));

const templates = endpointTemplates.concat(databaseAccessTemplates);

templates.forEach(template => {
    const path = buildPath(homeArray, template.location);
    writeFileSync(path, template.template);
})
