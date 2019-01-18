import React, { Component } from 'react';
import TaskDetails from '../components/TaskDetails.js';

export default class TaskDetailsContainer extends Component {
	render() {
		return (
			<TaskDetails
				data={this.props.data}
			/>
			);
	}
}