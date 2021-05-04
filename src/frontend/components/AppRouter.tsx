import React, { ReactNode } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import SiteHeader from './cellular/SiteHeader';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import BlogPage from './pages/BlogPage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import TodosPage from './pages/TodosPage';
import WorkoutManagerPage from './pages/WorkoutManagerPage';
import CreateWorkoutPage from './pages/CreateWorkoutPage';
import { useUserStatus } from '../hooks/network/useUserStatus';
import EditExercisePage from './pages/EditExercisePage';

type AppRouterProps = {
    themeSetter: ReactNode
}
// ^(?!\/create$|\/login$).*
const AppRouter = ({ themeSetter }: AppRouterProps) => {
    const { isSuccess, data, isLoading } = useUserStatus()
    return (
        <Router basename='/app'>
            <Switch>
                <Route render={(props) => {
                    const path = props.location.pathname;
                    if (['/login', '/create_account'].includes(path)) return null;
                    return <SiteHeader themeSetter={themeSetter} />;
                }} />
            </Switch>
            
            <Switch>
                <Route exact path='/home'>
                    <HomePage />
                </Route>
                <Route path='/courses'>
                    <CoursesPage />
                </Route>
                <Route path='/blog'>
                    <BlogPage />
                </Route>
                <Route path='/projects'>
                    <ProjectsPage />
                </Route>
                <Route path='/resume'>
                    <ResumePage />
                </Route>
                <Route path='/docs'>
                    <div>Docs</div>
                </Route>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/create_account'>
                    <CreateAccountPage />
                </Route>
                <Route path='/todos'>
                    <TodosPage />
                </Route>
                <Route path='/workout_manager'>
                    <WorkoutManagerPage />
                </Route>
                <Route path='/edit_exercise'>
                    {isLoading && <div>Loading...</div>}
                    {isSuccess && (data.isAdmin ? <EditExercisePage /> : <Redirect to='/projects' />)}
                </Route>
                <Route path='/workout_create'>
                    <CreateWorkoutPage />
                </Route>

            </Switch>
        </Router>
    );
}

export default AppRouter;