import React, { Component } from 'react';
import { getTasks } from '../api.js';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskData: null
		}

		this.onRowsDelete = this.onRowsDelete.bind(this);
		this.onCellClick = this.onCellClick.bind(this);
	}

	componentDidMount() {
		getTasks().then((response) => {
			response.forEach((item) => {
				item.ac = <Checkbox />;
			});
			this.setState({taskData: response});
		});
	}

	onRowsDelete(e) {
		console.log(e);
	}

	onCellClick(colData, cellMeta) {
		console.log(colData,cellMeta);
	}

	render() {
		return (
			<React.Fragment>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				{this.state.taskData === null ?
					<p>Loading...</p>
					:
					<MaterialTable
					  title={"Task list"}
					  onSelectionChange={this.onRowsDelete}
					  onRowClick={this.onCellClick}
					  data={this.state.taskData}
					  columns={[{title: "#", field: 'ac'},{title: "ID", field: '_id'}, {title: "Title", field: 'title'}, {title:"Description", field: 'description'}, {title: "Creation date", field:'createdAt'}]}
					  options={{
					  	actionsColumnIndex: -1,
					  }}
					  actions={[
					  	{
					      icon: 'edit_circle',
					      tooltip: 'Show User Info',
					      onClick: (event, rowData) => {
					        alert('You clicked user ' + rowData.title)
					      },
					    },
					  	]}
					/>
				}
			</React.Fragment>
		);
	}
}