import React, { Component } from 'react';
import AddUpdateDialog from '../components/AddUpdateDialog.js';
import { createTask, updateTask } from '../api.js';

export default class addUpdateDialogContainer extends Component {
	constructor(props) {
		super(props);

		this.state={
			type: 'Add new task',
			title: '',
			description: ''
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSaveClick = this.handleSaveClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		this.checkComponentType();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.open !== this.props.open) {
			this.checkComponentType();
		}

	}

	checkComponentType() {
		if(this.props.data) {
			this.setState({
				type: 'Edit task',
				title: this.props.data.title,
				description: this.props.data.description
			});
		}
		else {
			this.setState({
				type: 'Add new task',
				title: '',
				description: ''
			});
		}
	}

	createNewTask() {
		createTask(this.state.title, this.state.description)
		.then((response) =>{
			this.props.onDataChange(response);
		});
	}

	updateCurrentTask() {
		updateTask(this.props.data._id, this.state.title, this.state.description)
		.then((response) => {
			this.props.onDataChange(response);
		});
	}

	handleClose() {
		this.props.handleClose();
	}

	handleSaveClick() {
		if(this.state.type === 'Edit task' && this.props.data._id) {
			this.updateCurrentTask();
		}
		else {
			this.createNewTask();
		}
	}

	handleInputChange(e) {
		this.setState({[e.target.id]: e.target.value});
	}

	render() {
		return (
			<AddUpdateDialog
				open={this.props.open}
				handleClose={this.handleClose}
				handleSaveClick={this.handleSaveClick}
				handleInputChange={this.handleInputChange}
				title={this.state.title}
				description={this.state.description}
				type={this.state.type}
			/>
			);
	}
}