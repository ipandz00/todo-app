import React, { Component } from 'react';
import AddUpdateDialog from '../components/AddUpdateDialog.js';

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
		if(prevProps.data._id !== this.props.data._id) {
			this.checkComponentType();
		}

	}

	checkComponentType() {
		if(this.props.data.title) {
			this.setState({
				type: 'Edit task',
				title: this.props.data.title,
				description: this.props.data.description
			});
		}
	}

	handleClose() {
		this.props.handleClose();
	}

	handleSaveClick() {
		this.props.handleSave(this.state);
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