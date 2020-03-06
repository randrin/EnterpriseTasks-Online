import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjectTask, addProjectTask } from "../../actions/projectTaskAction";
import classnames from "classnames";

class EditProjectTask extends Component {

    constructor() {
      super();
      this.state = {
        id: "",
        nameTask: "",
        descriptionTask: "",
        status: "",
        errors: []
      };
      this.onChangeTask = this.onChangeTask.bind(this);
      this.onSubmitTask = this.onSubmitTask.bind(this);
      this.hasErrorFor = this.hasErrorFor.bind(this);
      this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    componentDidMount() {
      const { id_task } = this.props.match.params;
      this.props.getProjectTask(id_task);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({ errors : nextProps.errors })
      }
      const { id, nameTask, descriptionTask, status } = nextProps.project_task;
      this.setState({ id, nameTask, descriptionTask, status });
    }

    hasErrorFor(field) {
      return !!this.state.errors[field];
    }
  
    renderErrorFor(field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className="invalid-feedback text-left">
            <strong>{this.state.errors[field]}</strong>
          </span>
        );
      }
    }
  
    onChangeTask(e) {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ errors: ''});
    }

    onSubmitTask(e) {
      e.preventDefault();
      const updateTask = {
        nameTask: this.state.nameTask,
        descriptionTask: this.state.descriptionTask,
        status: this.state.status
      };
      // console.log('newTask: ', newTask);
      this.props.addProjectTask(updateTask, this.props.history);
    }

    
    render() {
      const { errors } = this.state;
      return (
        <div className="addProjectTask">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="text-left">
                  <Link to="/" className="btn btn-danger">
                    <i className="fa fa-chevron-left"></i> Back to Board
                  </Link>
                </div>
                <br/>
                <h4 className="display-4 text-center">
                  Add / Update Project Task
                </h4>
                <form onSubmit={this.onSubmitTask}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.nameTask
                      })}
                      name="nameTask"
                      placeholder="Project Task Name"
                      value={this.state.nameTask}
                      onChange={this.onChangeTask}
                    />
                    {this.renderErrorFor("nameTask")}
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Project Task Description"
                      name="descriptionTask"
                      value={this.state.descriptionTask}
                      onChange={this.onChangeTask}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChangeTask}
                    >
                      <option value="">Select Status</option>
                      <option value="TO_DO">TO DO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  EditProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    project_task: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    project_task: state.project_task.project_task,
    errors: state.errors
  });

export default connect(mapStateToProps, {getProjectTask, addProjectTask}) (EditProjectTask);