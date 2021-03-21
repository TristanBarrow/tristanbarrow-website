import { writeFileSync } from 'fs';
import config from './config';
import all from './templates/all.template';
import { getHomeDir } from './util/getHomeDir';
import { generateEndpoint } from './templates/endpoints.template';
const buildPath = (homeArray: string[], location: string[]) => {
    return homeArray.concat(location).join('/');
}

const homeArray = getHomeDir();

const names = config.map(option => option.name);
const allTemplate = all(names);
const allLocation = homeArray.concat(allTemplate.location);
writeFileSync(allLocation.join('/'), allTemplate.template);

const endpointTemplates = config.map(endpoint => generateEndpoint(endpoint));

endpointTemplates.forEach(template => {
    const path = buildPath(homeArray, template.location);
    console.log(path);
    writeFileSync(path, template.template);
})
