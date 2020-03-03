import axios from 'axios';
import { GET_ERRORS } from './types';

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
}