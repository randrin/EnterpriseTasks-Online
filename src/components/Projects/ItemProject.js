import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectsAction";

class ItemProject extends Component {
  onDeleteProject(id_project) {
    this.props.deleteProject(id_project);
  }

  getProjectPriority(priority) {
    if (priority === "PRIORITY_MINOR") {
      return "success";
    }
    if (priority === "PRIORITY_MEDIUM") {
      return "warning";
    }
    if (priority === "PRIORITY_MAJOR") {
      return "danger";
    }
  }

  render() {
    const { itemProject } = this.props;
    return (
      <div
        className={`card border border-${this.getProjectPriority(
          itemProject.priority
        )} text-left mb-4 mt-4`}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <div className="row ml-2 mb-3">
                    <div className="project-logo">
                      <img
                        src={itemProject.projectLogo}
                        alt={itemProject.projectName}
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="row ml-2 project-created">
                    <span>Created By </span>
                    <h5>{itemProject.projectCreatedBy}</h5>
                  </div>
                </div>
                <div className="col-md-8">
                  <h3 className="mb-3">{itemProject.projectName}</h3>
                  <p>{itemProject.projectDescription}</p>
                  <div className="row mt-5">
                    <div className="col-md-6">
                      <div className="project-created">
                        <h6 className="text-success">
                          <i className="fa fa-calendar"></i> Start Project
                        </h6>
                        <h5>{itemProject.projectStart}</h5>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="project-created">
                        <h6 className="text-danger">
                          <i className="fa fa-calendar"></i> End Project
                        </h6>
                        <h5>{itemProject.projectEnd}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-right">
              <div className="row project-action mr-3">
                <div className="mb-3">
                  <Link
                    to={`getProject/${itemProject.id}`}
                    className="btn btn-info"
                  >
                    <i className="fa fa-cogs"></i> Project Tasks{" "}
                    <span className="badge badge-light">
                      {itemProject.projectTasksList.length}
                    </span>
                  </Link>
                </div>
                <div className="mb-3">
                  <Link
                    to={`getProject/${itemProject.id}`}
                    className="btn btn-primary"
                  >
                    <i className="fa fa-edit"></i> Update Project
                  </Link>
                </div>
                <div>
                  <button
                    className="btn btn-danger ml-4"
                    onClick={this.onDeleteProject.bind(this, itemProject.id)}
                  >
                    <i className="fa fa-trash"></i> Delete Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ItemProject.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(ItemProject);
