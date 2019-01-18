import React, { Component } from 'react';
import { getTask } from '../api.js';
import { Link } from "react-router-dom";
import Dialog from '../containers/AddUpdateDialogContainer.js';
import TaskDetails from '../containers/TaskDetailsContainer.js';
import Button from '@material-ui/core/Button';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskData: null,
			updateModal: false
		}

		this.handleClose = this.handleClose.bind(this);
		this.handleSave = this.handleSave.bind(this);
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
		console.log(data);
		this.setState({updateModal: false});
	}

	render() {
		return (
			<React.Fragment>
				<Link to='/tasks'>Go back</Link>
				{this.state.taskData && 
					<React.Fragment>
						<TaskDetails data={this.state.taskData}/>
						<Dialog 
							open={this.state.updateModal} 
							data={this.state.taskData}
							handleClose={this.handleClose}
							handleSave={this.handleSave}
						/>
						<Button onClick={()=>this.setState({updateModal: true})}>Edit</Button>
					</React.Fragment>
				}
			</React.Fragment>
		);
	}
}