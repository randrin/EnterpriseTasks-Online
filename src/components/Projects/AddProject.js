import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../actions/projectsAction";
import classnames from "classnames";
import Moment from 'moment';

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectDescription: "",
      projectCreatedBy: "",
      projectLogo: "",
      projectStart: "",
      projectEnd: "",
      priority: "",
      valid: "",
      errors: []
    };
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onSubmitProject = this.onSubmitProject.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

  onChangeProject(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: "" });
  }

  onSubmitProject(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectDescription: this.state.projectDescription,
      projectCreatedBy: this.state.projectCreatedBy,
      projectLogo: this.state.projectLogo,
      projectStart: Moment(this.state.projectStart).format('DD-MM-YYYY HH:mm:ss'),
      projectEnd: Moment(this.state.projectEnd).format('DD-MM-YYYY HH:mm:ss'),
      priority: this.state.priority
    };
    this.props.addProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="addProjectTask">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <div className="text-left">
                <Link to="/" className="btn btn-danger">
                  <i className="fa fa-chevron-left"></i> Back to Board
                </Link>
              </div>
              <br />
              <h4 className="display-4 text-center">Add / Update Project</h4>
              <form onSubmit={this.onSubmitProject}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName
                    })}
                    name="projectName"
                    placeholder="Project Name"
                    value={this.state.projectName}
                    onChange={this.onChangeProject}
                  />
                  {this.renderErrorFor("projectName")}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectDescription
                    })}
                    placeholder="Project Description"
                    name="projectDescription"
                    value={this.state.projectDescription}
                    onChange={this.onChangeProject}
                  />
                  {this.renderErrorFor("projectDescription")}
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6 m-auto">
                      <input
                        type="date"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.valid
                        })}
                        placeholder="Project Start"
                        pattern="dd-MM-yyyy"
                        name="projectStart"
                        value={this.state.projectStart}
                        onChange={this.onChangeProject}
                      />
                      {this.renderErrorFor("valid")}
                    </div>
                    <div className="col-md-6 m-auto">
                      <input
                        type="date"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.valid
                        })}
                        placeholder="Project End"
                        name="projectEnd"
                        value={this.state.projectEnd}
                        onChange={this.onChangeProject}
                      />
                      {this.renderErrorFor("valid")}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-12 m-auto">
                      <select
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.priority
                        })}
                        name="priority"
                        value={this.state.priority}
                        onChange={this.onChangeProject}
                      >
                        <option value="">Select Priority</option>
                        <option value="PRIORITY_MINOR">MINOR</option>
                        <option value="PRIORITY_MEDIUM">MEDIUM</option>
                        <option value="PRIORITY_MAJOR">MAJOR</option>
                        <option value="PRIORITY_LOW">LOW</option>
                        <option value="PRIORITY_HOLD">
                          IN PROGRESS / HOLD
                        </option>
                        <option value="PRIORITY_HIGH">HIGH</option>
                      </select>
                      {this.renderErrorFor("priority")}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-12 m-auto">
                      <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                          "is-invalid": errors.projectCreatedBy
                        })}
                        placeholder="Project user's created"
                        name="projectCreatedBy"
                        value={this.state.projectCreatedBy}
                        onChange={this.onChangeProject}
                      />
                      {this.renderErrorFor("projectCreatedBy")}
                    </div>
                  </div>
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

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addProject })(AddProject);
