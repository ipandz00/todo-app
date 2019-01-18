import React, { Component } from 'react';
import { getTasks, deleteTasks } from '../api.js';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Dialog from '../containers/AddUpdateDialogContainer.js';
import DeleteDialog from '../containers/DeleteDialogContainer.js';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasksData: null,
			addModal: false,
			singleTask: null,
			deleteDialog: false
		}

		this.idsToDelete = [];

		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
		this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
		this.onDataChange = this.onDataChange.bind(this);
	}

	componentDidMount() {
		getTasks().then((response) => {
			response.forEach((item) => {
				item.actions = <div><Link to={"/task/"+item._id}><Button variant="outlined" color="primary" >Details</Button></Link><Button variant="outlined" onClick={() => this.handleEdit(item)}>Edit</Button></div>;
			});
			this.setState({tasksData: response});
		});
	}

	onSelectionChange(e) {
		this.idsToDelete = e.map((item) => item._id);
	}

	handleTaskDelete() {
		deleteTasks(this.idsToDelete)
		.then((response) => {
			let data = this.state.tasksData;
			this.idsToDelete.forEach((item) => {
				let index = data.findIndex(x => x._id === item);
				data.splice(index, 1);
			});
			this.setState({tasksData: data});
			this.idsToDelete.length = 0;
		})
	}

	onDataChange(data) {
		let stateData = this.state.tasksData;
		let index = stateData.findIndex(x => x._id === data._id);

		if(index === -1) {
			data.actions = <div><Link to={"/task/"+data._id}><Button variant="outlined" color="primary" >Details</Button></Link><Button variant="outlined" onClick={() => this.handleEdit(data)}>Edit</Button></div>;
			stateData.push(data);
		}
		else {
			stateData[index].title = data.title;
			stateData[index].description = data.description;
		}

		this.setState({tasksData: stateData, addModal: false});
	}

	handleEdit(data) {
		this.setState({singleTask: data, addModal: true});
	}

	handleDeleteDialog(ans) {
		if(ans) {
			this.handleTaskDelete();
		}
		this.setState({deleteDialog: false});	
	}

	render() {
		return (
			<React.Fragment>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				{this.state.tasksData === null ?
					<p>Loading...</p>
					:
					<MaterialTable
					  title={
					  	<div>
					  	<Fab color="primary" aria-label="Add" size='small' onClick={()=>this.setState({addModal:true, singleTask: null})}>
					        <AddIcon />
					      </Fab>Task list
					    </div>}
					  onSelectionChange={this.onSelectionChange}
					  data={this.state.tasksData}
					  columns={[{title: "ID", field: '_id'}, {title: "Title", field: 'title'}, {title:"Description", field: 'description'}, {title: "Creation date", field:'createdAt'},{title: "Actions", field: 'actions'}]}
					  options={{
					  	actionsColumnIndex: -1,
					  	selection: true,
					  	paging: this.state.tasksData.length > 5
					  }}
					  actions={[
					  	{
					      icon: 'delete_circle',
					      tooltip: 'Delete selected tasks',
					      onClick: () => {
					      	this.setState({deleteDialog: true});
					      }
					    },
					  	]}
					/>
				}
				<Dialog 
					open={this.state.addModal} 
					handleClose={()=>this.setState({addModal: false})}
					onDataChange={this.onDataChange}
					data={this.state.singleTask}
				/>
				<DeleteDialog
					open={this.state.deleteDialog}
					getAnswer={this.handleDeleteDialog} 
				/>
			</React.Fragment>
		);
	}
}