import axios from 'axios';
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from './types';

export const addProject = (newProject, history) => async dispatch => {
    try {
        await axios.post('http://localhost:8084/api/projects/saveProject', newProject);
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

export const getProjects = () => async dispatch => {
    const response = await axios.get('http://localhost:8084/api/projects/getProjects');
    dispatch({
        type: GET_PROJECTS,
        payload: response.data
    });
};

export const deleteProject = (id_project) => async dispatch => {
    if (window.confirm(`Are you sure you want to delete this project ID: ${id_project} ?`)) {
        axios.delete(`http://localhost:8084/api/projects/project/${id_project}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: id_project
        });
    }
}

export const getProject = (id_project, history) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:8084/api/projects/project/${id_project}`);
        dispatch({
            type: GET_PROJECT,
            payload: response.data
        });
    } catch (error) {
        history.push('/');
    }
};