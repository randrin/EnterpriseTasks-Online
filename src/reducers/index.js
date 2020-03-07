import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import projectTasksReducer from './projectTasksReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
    errors: errorsReducer,
    project_task: projectTasksReducer,
    project: projectsReducer
});