import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../actions/projectTasksAction";

class ItemProjectTask extends Component {
  onDeleteTask(id_task) {
    this.props.deleteProjectTask(id_task);
  }

  getPriorityBadge(priority) {
    if (priority === 'PRIORITY_MINOR') {
      return 'success';
    }
    if (priority === 'PRIORITY_MEDIUM') {
      return 'warning';
    }
    if (priority === 'PRIORITY_MAJOR') {
      return 'danger';
    }
    if (priority === 'PRIORITY_LOW') {
      return 'success';
    }
    if (priority === 'PRIORITY_HOLD') {
      return 'info';
    }
    if (priority === 'PRIORITY_HIGH') {
      return 'danger';
    }
  }

  getPriorityIcon(priority) {
    if (priority === 'PRIORITY_MINOR') {
      return 'chevron-down';
    }
    if (priority === 'PRIORITY_MEDIUM') {
      return 'minus';
    }
    if (priority === 'PRIORITY_MAJOR') {
      return 'chevron-up';
    }
    if (priority === 'PRIORITY_LOW') {
      return 'arrow-down';
    }
    if (priority === 'PRIORITY_HOLD') {
      return 'arrows-v';
    }
    if (priority === 'PRIORITY_HIGH') {
      return 'arrow-up';
    }
  }

  render() {
    const { itemTask } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">
          <div className="row">
            <div className="col-md-6 text-left">ID: {itemTask.id}</div>
            <div className="col-md-6 text-right">
              <h5>
                <span className={`badge badge-${this.getPriorityBadge(itemTask.priority)}`}>
                  <i className={`fa fa-${this.getPriorityIcon(itemTask.priority)}`}></i>
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{itemTask.nameTask}</h5>
          <p className="card-text text-truncate">{itemTask.descriptionTask}</p>
          <Link
            to={`getProjectTask/${itemTask.id}`}
            className="btn btn-primary"
          >
            <i className="fa fa-edit"></i> View / Update
          </Link>
          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteTask.bind(this, itemTask.id)}
          >
            <i className="fa fa-trash"></i> Delete
          </button>
        </div>
      </div>
    );
  }
}

ItemProjectTask.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null, { deleteProjectTask })(ItemProjectTask);
