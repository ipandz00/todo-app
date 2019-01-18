import React, { Component } from 'react';
import { getTask, deleteTasks, updateTask } from '../api.js';
import { Link, Redirect } from "react-router-dom";
import Dialog from '../containers/AddUpdateDialogContainer.js';
import TaskDetails from '../containers/TaskDetailsContainer.js';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BackIcon from '@material-ui/icons/Reply';
import DeleteDialog from '../containers/DeleteDialogContainer.js';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskData: null,
			updateModal: false,
			deleteModal: false,
			redirect: false
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
	}

	componentDidMount() {
		getTask(this.props.match.params.id)
		.then(response => {
			this.setState({taskData: response});
		});
	}

	handleClose() {
		this.setState({updateModal: false});
	}

	handleSave(data) {
		updateTask(this.state.taskData._id, data.title, data.description)
			.then((response) => {
				this.setState({taskData: response});
			});
		this.setState({updateModal: false});
	}

	handleDeleteDialog(ans) {
		if(ans) {
			this.handleTaskDelete();
		}
		this.setState({deleteModal: false});
	}

	handleTaskDelete(id) {
		deleteTasks([this.state.taskData._id])
		.then((response) => {
			this.setState({tasksData: null, redirect: true});
		})
	}

	render() {
		if (this.state.redirect) {
	       return <Redirect to='/tasks'/>;
	     }
		return (
			<React.Fragment>
				{this.state.taskData && 
					<React.Fragment>
						<TaskDetails data={this.state.taskData}/>
						<Dialog 
							open={this.state.updateModal} 
							data={this.state.taskData}
							handleClose={this.handleClose}
							handleSave={this.handleSave}
						/>
						<DeleteDialog
							open={this.state.deleteModal}
							getAnswer={this.handleDeleteDialog} 
						/>
						<Link to='/tasks'>
							<Fab aria-label="back" >
						    	<BackIcon />
						    </Fab>
						</Link>
						<Fab color="primary" aria-label="Edit" onClick={()=>this.setState({updateModal: true})}>
					    	<EditIcon />
					    </Fab>
					    <Fab color="secondary" aria-label="Delete" onClick={()=>this.setState({deleteModal: true})}>
					    	<DeleteIcon />
					    </Fab>
					</React.Fragment>
				}
			</React.Fragment>
		);
	}
}