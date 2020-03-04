import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProjectTask } from '../../actions/projectTaskAction';

class ItemProjectTask extends Component {

    onDeleteTask(id_task) {
      this.props.deleteProjectTask(id_task);
    }

    render() {
      const { itemTask } = this.props;
      return (
        <div className="card mb-1 bg-light">
            <div className="card-header text-left text-primary">
                ID: {itemTask.id}
            </div>
            <div className="card-body bg-light">
                <h5 className="card-title">{itemTask.nameTask}</h5>
                <p className="card-text text-truncate">{itemTask.descriptionTask}</p>
                <Link to="#" className="btn btn-primary">
                  <i class="fa fa-edit"></i> View / Update
                </Link>
                <button className="btn btn-danger ml-4" onClick={this.onDeleteTask.bind(this, itemTask.id)}>
                  <i class="fa fa-trash"></i> Delete
                </button>
            </div>
        </div>
      );
    }
  }

  ItemProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
  };

export default connect(null, {deleteProjectTask}) (ItemProjectTask);