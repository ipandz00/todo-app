import React, { Component } from 'react';
import { getTask } from '../api.js';
import { Link } from "react-router-dom";
import Dialog from '../containers/AddUpdateDialogContainer.js';

export default class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskData: null,
			updateModal: false
		}
	}

	componentDidMount() {
		getTask(this.props.match.params.id)
		.then(response => {
			this.setState({taskData: response});
		});
	}

	render() {
		return (
			<React.Fragment>
				<Link to='/tasks'>Go back</Link>
				{this.state.taskData && 
					<Dialog open={this.state.updateModal} data={this.state.taskData}/>
				}
			</React.Fragment>
		);
	}
}