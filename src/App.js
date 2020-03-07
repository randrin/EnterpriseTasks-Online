import React from 'react';
import './css/App.css';
import ProjectBoardNavbar from './components/ProjectBoardNavbar';
import ProjectTasksBoard from './components/ProjectTasksBoard';
import ProjectsBoard from './components/ProjectsBoard';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import AddProjectTask from './components/ProjectTasks/AddProjectTask';
import AddProject from './components/Projects/AddProject';
import { Provider } from 'react-redux';
import store from './store.js';
import EditProjectTask from './components/ProjectTasks/EditProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1 className="alert alert-success">Bienvenue sur la Gestion de Project Management</h1>
          <ProjectBoardNavbar />
          <Route exact path="/" component={ProjectsBoard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/getProject/:id_project" component={ProjectTasksBoard} />
          <Route exact path="/addProjectTask" component={AddProjectTask} />
          <Route exact path="/getProjectTask/:id_task" component={EditProjectTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
