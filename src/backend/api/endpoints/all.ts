import { Express } from 'express'; 

import { application } from './application';
import { user } from './user';
import { todo } from './gen/todo'

export default (app: Express) => {
    application(app);
    user(app);
    todo(app);

}
