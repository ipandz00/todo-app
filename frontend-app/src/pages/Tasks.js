import React, { Component } from 'react';
import { getTasks } from '../api.js';

export default class Tasks extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		getTasks().then((response) => {
			console.log(response);
		});
	}

	render() {
		return (
			<React.Fragment>
				Multiple tasks overview
			</React.Fragment>
		);
	}
}