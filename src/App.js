import React from 'react';
import './App.css';
import ProjectBoardNavbar from './components/ProjectBoardNavbar';
import ProjectBoard from './components/ProjectBoard';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import AddProjectTask from './components/ProjectTasks/AddProjectTask';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="alert alert-success">Bienvenue sur la Gestion de Project Management</h1>
        <ProjectBoardNavbar />
        <Route exact path="/" component={ProjectBoard} />
        <Route exact path="/addProjetTask" component={AddProjectTask} />
      </div>
    </Router>
  );
}

export default App;
