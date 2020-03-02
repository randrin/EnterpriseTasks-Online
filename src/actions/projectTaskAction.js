import axios from 'axios';

export const addProjectTask = (newProjectTask, history) => async dispatch => {
    await axios.post('http://localhost:8084/api/tasks/saveTask', newProjectTask);
    history.push('/');
}