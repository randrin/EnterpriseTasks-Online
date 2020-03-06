import React from 'react';
import './App.css';
import ProjectBoardNavbar from './components/ProjectBoardNavbar';
import ProjectBoard from './components/ProjectBoard';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import AddProjectTask from './components/ProjectTasks/AddProjectTask';
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
          <Route exact path="/" component={ProjectBoard} />
          <Route exact path="/addProjectTask" component={AddProjectTask} />
          <Route exact path="/getProjectTask/:id_task" component={EditProjectTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
