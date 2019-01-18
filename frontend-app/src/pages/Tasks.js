import React, { Component } from 'react';
import { getTasks } from '../api.js';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Dialog from '../containers/AddUpdateDialogContainer.js';

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasksData: null
		}

		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
	}

	componentDidMount() {
		getTasks().then((response) => {
			response.forEach((item) => {
				item.actions = <div><Link to={"/task/"+item._id}><Button variant="outlined" color="primary" >Details</Button></Link><Button variant="outlined">Edit</Button></div>;
			});
			this.setState({tasksData: response});
		});
	}

	onSelectionChange(e) {
		console.log(e);
	}

	onCellClick(colData, cellMeta) {
		console.log(colData,cellMeta);
	}

	handleTaskDelete(event, rowData) {
		console.log(rowData);
	}

	render() {
		return (
			<React.Fragment>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				{this.state.tasksData === null ?
					<p>Loading...</p>
					:
					<MaterialTable
					  title={"Task list"}
					  onSelectionChange={this.onSelectionChange}
					  data={this.state.tasksData}
					  columns={[{title: "ID", field: '_id'}, {title: "Title", field: 'title'}, {title:"Description", field: 'description'}, {title: "Creation date", field:'createdAt'},{title: "Actions", field: 'actions'}]}
					  options={{
					  	actionsColumnIndex: -1,
					  	selection: true
					  }}
					  actions={[
					  	{
					      icon: 'delete_circle',
					      tooltip: 'Delete selected tasks',
					      onClick: this.handleTaskDelete
					    },
					  	]}
					/>
				}

			</React.Fragment>
		);
	}
}