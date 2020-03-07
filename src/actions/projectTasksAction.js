import axios from 'axios';
import { GET_ERRORS, GET_PROJECT_TASKS, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';

export const addProjectTask = (newProjectTask, history) => async dispatch => {
    try {
        await axios.post('http://localhost:8084/api/tasks/saveTask', newProjectTask);
        history.push('/');
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getProjectTasks = () => async dispatch => {
    const response = await axios.get('http://localhost:8084/api/tasks/getTasks');
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: response.data
    });
};

export const deleteProjectTask = (id_task) => async dispatch => {
    if (window.confirm(`Are you sure you want to delete the task ID: ${id_task} ?`)) {
        axios.delete(`http://localhost:8084/api/tasks/task/${id_task}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: id_task
        });
    }
}

export const getProjectTask = (id_task, history) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:8084/api/tasks/task/${id_task}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: response.data
        });
    } catch (error) {
        history.push('/');
    }
};