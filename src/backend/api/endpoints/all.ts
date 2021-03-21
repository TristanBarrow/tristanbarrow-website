import { Express } from 'express'; 

import { application } from './application';
import { user } from './user';

export default (app: Express) => {
    application(app);
    user(app);
}