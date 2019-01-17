import React, { Component } from 'react';
import { getTasks } from '../api.js';
import MUIDataTable from "mui-datatables";

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskData: null
		}

		this.onRowsDelete = this.onRowsDelete.bind(this);
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

	onRowsDelete(e) {
		console.log(e);
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
					  options = {{
					  	filterType: 'checkbox',
					  	rowsPerPage: 5,
					  	print: false,
					  	download: false,
					  	onRowsDelete: this.onRowsDelete,
					  	pagination: this.state.taskData.length > 5
					  }}
					/>
				}
			</React.Fragment>
		);
	}
}