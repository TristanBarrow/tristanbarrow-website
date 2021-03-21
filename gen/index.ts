import { writeFileSync } from 'fs';
import { join } from 'path';
import all from './templates/all.template';

let home = `${__dirname}`;
let homeArray = home.split('/');
homeArray.pop();
home = homeArray.join('/')

const allTemplate = all([]);
const allLocation = homeArray.concat(allTemplate.location);
writeFileSync(allLocation.join('/'), allTemplate.template);
