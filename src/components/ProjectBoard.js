import React, { Component } from "react";
import { Link } from "react-router-dom";
import ItemProjectTask from "./ProjectTasks/ItemProjectTask";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjectTasks } from "../actions/projectTaskAction";

class ProjectBoard extends Component {
  componentDidMount() {
    this.props.getProjectTasks();
  }

  render() {
    const { project_tasks } = this.props.project_tasks;

    let BoardContent;
    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    const BoardAlgorithm = project_tasks => {
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
          if (element.props.itemTask.status === "TO_DO") {
            todoItems.push(element);
          }
          if (element.props.itemTask.status === "IN_PROGRESS") {
            inProgressItems.push(element);
          }
          if (element.props.itemTask.status === "DONE") {
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
    };

    BoardContent = BoardAlgorithm(project_tasks);

    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="text-left">
              <Link to="/addProjectTask" className="btn btn-primary mb-3">
                <i className="fa fa-plus-circle"></i> New Project Task
              </Link>
            </div>
          </div>
          <div className="col-md-4 m-auto">
            <div className="text-right">
              <div className="row legende">
                <div className="col-md-6">
                  <h5>Minor <span className="badge badge-success"><i className="fa fa-chevron-down"></i></span></h5>
                  <h5>Medium <span className="badge badge-warning"><i className="fa fa-minus"></i></span></h5>
                  <h5>Major <span className="badge badge-danger"><i className="fa fa-chevron-up"></i></span></h5>
                </div>
                <div className="col-md-6">
                  <h5>Low <span className="badge badge-success"><i className="fa fa-arrow-down"></i></span></h5> 	
                  <h5>In Hold <span className="badge badge-info"><i className="fa fa-arrows-v"></i></span></h5>
                  <h5>High <span className="badge badge-danger"><i className="fa fa-arrow-up"></i></span></h5>
                </div>
              </div>
            </div>
          </div>
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
};

const mapStateToProps = state => ({
  project_tasks: state.project_task
});

export default connect(mapStateToProps, { getProjectTasks })(ProjectBoard);
