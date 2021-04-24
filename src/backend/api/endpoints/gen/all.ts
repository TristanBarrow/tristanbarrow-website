import { Express } from 'express'; 

import { application } from '../application';
import { user } from '../user';
import { todo } from './todo'
import { project } from './project'
import { exercise } from './exercise'
import { workout } from './workout'
import { workoutSet } from './workoutSet'

export default (app: Express) => {
    application(app);
    user(app);
    todo(app);
    project(app);
    exercise(app);
    workout(app);
    workoutSet(app);

}
