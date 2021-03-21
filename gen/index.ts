import { writeFileSync } from 'fs';
import config from './config';
import all from './templates/all.template';

const names = config.map(option => option.name);

let home = `${__dirname}`;
let homeArray = home.split('/');
homeArray.pop();
home = homeArray.join('/')

const allTemplate = all(names);
const allLocation = homeArray.concat(allTemplate.location);
writeFileSync(allLocation.join('/'), allTemplate.template);
