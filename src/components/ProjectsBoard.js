import React, { Component } from "react";
import PropTypes from "prop-types";
import ItemProject from "./Projects/ItemProject";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectsAction";

class ProjectsBoard extends Component {

  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.projects;

    let BoardContent;
    let allProjects = [];

    const BoardAlgorithm = projects => {
        if (projects.length < 1) {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project in board
            </div>
          );
        } else {
          const totaProjects = projects.map(project => (
            <ItemProject key={project.id} itemProject={project} />
          ));

          totaProjects.forEach(element => {
            allProjects.push(element);
          });
        }

        return (
            <React.Fragment>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {allProjects}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
      };

      BoardContent = BoardAlgorithm(projects);

      return (
        <div className="container">
          <br />
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="text-left">
                <Link to="/addProject" className="btn btn-primary mb-3">
                  <i className="fa fa-plus-circle"></i> New Project
                </Link>
              </div>
            </div>
            <div className="col-md-4 m-auto">
              <div className="text-right legende">
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h5>Priority Minor</h5>
                    </div>
                    <div className="col-md-6">
                        <span className="progress">
                            <div className="progress-bar bg-success"></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h5>Priority Medium</h5>
                    </div>
                    <div className="col-md-6">
                        <span className="progress">
                            <div className="progress-bar bg-warning"></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 text-left">
                        <h5>Priority Major</h5>
                    </div>
                    <div className="col-md-6">
                        <span className="progress">
                            <div className="progress-bar bg-danger"></div>
                        </span>
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

ProjectsBoard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  projects: state.project
});

export default connect(mapStateToProps, { getProjects })(ProjectsBoard);
