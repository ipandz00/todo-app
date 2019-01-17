import React, { Component } from 'react';
import { getTasks } from '../api.js';
import MUIDataTable from "mui-datatables";

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskData: null
		}
	}

	componentDidMount() {
		getTasks().then((response) => {
			var output = response.map((obj) => {
			  return Object.keys(obj).map((key) => { 
			    return obj[key];
			  });
			});

			this.setState({taskData: output});
		});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.taskData === null ?
					<p>Loading...</p>
					:
					<MUIDataTable
					  title={"Task list"}
					  data={this.state.taskData}
					  columns={["ID", "Title", "Description", "Creation date"]}
					/>
				}
			</React.Fragment>
		);
	}
}