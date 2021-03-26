import { writeFileSync } from 'fs';
import config from './config';
import all from './templates/all.template';
import { getHomeDir } from './util/getHomeDir';
import { generateSql } from './templates/sql.template';
import { generateEndpoint } from './templates/endpoints.template';
import { generateNetworkTypes } from './templates/networkTypes.template';
import { generateDatabaseAccess } from './templates/databaseAcess.template';
import { generateRequestHooks } from './templates/requestHooks.template';
import { generateSubscriptionHooks } from './templates/subscriptionHook.template';
import { Template } from './types/Template';

const buildPath = (homeArray: string[], location: string[]) => {
    return homeArray.concat(location).join('/');
}

const homeArray = getHomeDir();

const names = config.map(option => option.name);
const allTemplate = all(names);
const allLocation = homeArray.concat(allTemplate.location);
writeFileSync(allLocation.join('/'), allTemplate.template);

const endpointTemplates = config.map(endpoint => generateEndpoint(endpoint));
const databaseAccessTemplates = config.map(database => generateDatabaseAccess(database));
const subscriptionHookTemplates = config.map(configItem => generateSubscriptionHooks(configItem));
const networkTypeTemplates = config.map(configItem => generateNetworkTypes(configItem));
const requestHookTemplates: Template[][] = config.map(configItem => generateRequestHooks(configItem));
const sqlTemplates = config.map(configItem => generateSql(configItem));

let templates: Template[] = []
    .concat(sqlTemplates)
    .concat(endpointTemplates)
    .concat(networkTypeTemplates)
    .concat(databaseAccessTemplates)
    .concat(subscriptionHookTemplates);

requestHookTemplates.forEach((templateArray: Template[]) => {
    templateArray.forEach((template => templates.push(template)));
});

templates.forEach(template => {
    const path = buildPath(homeArray, template.location);
    writeFileSync(path, template.template);
});
