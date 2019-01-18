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
import Grid from '@material-ui/core/Grid';

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
					<Grid 
				      container 
				      direction="column"
				      justify="center"
				      alignItems="center"
				      spacing={16}
				      style={{marginTop: '3%'}}
				    >
				    	<Grid item xs={8}>
							<TaskDetails data={this.state.taskData}/>
						</Grid>
						<Grid item xs={6}>
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
						</Grid>
					</Grid>
				}
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
			</React.Fragment>
		);
	}
}