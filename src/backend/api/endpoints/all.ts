import { Express } from 'express'; 

import { application } from './application';
import { todo } from './gen/todo';
import { user } from './user';

export default (app: Express) => {
    application(app);
    user(app);
    todo(app);
}