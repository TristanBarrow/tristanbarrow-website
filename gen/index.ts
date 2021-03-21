import { writeFileSync } from 'fs';
import config from './config';
import all from './templates/all.template';
import { getHomeDir } from './util/getHomeDir';

const homeArray = getHomeDir();

const names = config.map(option => option.name);
const allTemplate = all(names);
const allLocation = homeArray.concat(allTemplate.location);
writeFileSync(allLocation.join('/'), allTemplate.template);
