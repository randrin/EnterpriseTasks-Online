import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProjectTask } from "../../actions/projectTaskAction";
import classnames from "classnames";

class AddProjectTask extends Component {
  constructor() {
    super();
    this.state = {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  hasErrorFor(field) {
    console.log("Field: ", field);
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
    this.state.errors[e.target.name] = "";
  }

  onSubmitTask(e) {
    e.preventDefault();
    const newTask = {
      nameTask: this.state.nameTask,
      descriptionTask: this.state.descriptionTask,
      status: this.state.status
    };
    // console.log('newTask: ', newTask);
    this.props.addProjectTask(newTask, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="addProjectTask">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-danger">
                <i className="fa fa-chevron-left"></i> Back to Board
              </Link>
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

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
