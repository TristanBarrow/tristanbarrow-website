import { Express } from 'express'; 

import { application } from '../application';
import { user } from '../user';
import { todo } from './todo'
import { project } from './project'

export default (app: Express) => {
    application(app);
    user(app);
    todo(app);
    project(app);

}
