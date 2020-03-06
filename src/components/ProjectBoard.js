import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ItemProjectTask from './ProjectTasks/ItemProjectTask';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectTasks } from '../actions/projectTaskAction';

class ProjectBoard extends Component {

    componentDidMount() {
        this.props.getProjectTasks();
    }

  render() {
      const {project_tasks} = this.props.project_tasks;

      let BoardContent;
      let todoItems = [];
      let inProgressItems = [];
      let doneItems = [];

      const BoardAlgorithm = (project_tasks) => {
        if (project_tasks.length < 1) {
          return (
          <div className="alert alert-info text-center" role="alert">
              No Projet Task in board
          </div>
          );
        } else {
          const tasks = project_tasks.map(project_task => (
            <ItemProjectTask key={project_task.id} itemTask={project_task} />
          ));

          tasks.forEach(element => {
            if (element.props.itemTask.status === 'TO_DO') {
              todoItems.push(element);
            }
            if (element.props.itemTask.status === 'IN_PROGRESS') {
              inProgressItems.push(element);
            }
            if (element.props.itemTask.status === 'DONE') {
              doneItems.push(element);
            }
          });
        }

        return (
          <React.Fragment>
            <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="card text-center mb-2">
                      <div className="card-header bg-secondary text-white">
                        <h3>To Do</h3>
                      </div>
                    </div>
                    {todoItems}
                  </div>
                  <div className="col-md-4">
                    <div className="card text-center mb-2">
                      <div className="card-header bg-primary text-white">
                        <h3>In Progress</h3>
                      </div>
                    </div>
                    {inProgressItems}
                  </div>
                  <div className="col-md-4">
                    <div className="card text-center mb-2">
                      <div className="card-header bg-success text-white">
                        <h3>Done</h3>
                      </div>
                    </div>
                    {doneItems}
                  </div>
                </div>
              </div>
          </React.Fragment>
        );
      }

      BoardContent = BoardAlgorithm(project_tasks);

      return (
        <div className="container">
          <br />
          <div className="text-left">
            <Link to="/addProjectTask" className="btn btn-primary mb-3">
              <i className="fa fa-plus-circle"> New Project Task</i>
            </Link>
          </div>
          <br />
          <hr />
          {BoardContent}
        </div>
      );
  }
}

ProjectBoard.propTypes = {
    getProjectTasks: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_tasks: state.project_task
})

export default connect (mapStateToProps, {getProjectTasks}) (ProjectBoard);