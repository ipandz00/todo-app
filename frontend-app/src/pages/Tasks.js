import React, { Component } from 'react';
import { getTasks, createTask, updateTask } from '../api.js';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Dialog from '../containers/AddUpdateDialogContainer.js';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'

export default class Tasks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasksData: null,
			addModal: false,
			singleTask: null
		}

		this.onSelectionChange = this.onSelectionChange.bind(this);
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
		this.handleSave = this.handleSave.bind(this);
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
		console.log(e);
	}

	onCellClick(colData, cellMeta) {
		console.log(colData,cellMeta);
	}

	handleTaskDelete(event, rowData) {
		console.log(rowData);
	}

	handleSave(data) {
		if(data.type === 'Add new task') {
			createTask(data.title, data.description).then((response) =>{
				response.actions = <div><Link to={"/task/"+response._id}><Button variant="outlined" color="primary" >Details</Button></Link><Button variant="outlined" onClick={() => this.handleEdit(response)}>Edit</Button></div>;
				let data = this.state.tasksData;
				data.push(response);
				this.setState({tasksData: data});
			});
			this.setState({addModal: false});
		}
		else {
			updateTask(this.state.singleTask._id, data.title, data.description)
			.then((response) => {
				let data = this.state.tasksData;
				let index = data.findIndex(x => x._id === response._id);
				data[index].title = response.title;
				data[index].description = response.description;
				this.setState({tasksData: data});
			});
			this.setState({addModal: false});
		}
	}

	handleEdit(data) {
		this.setState({singleTask: data, addModal: true});
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
				<Dialog 
					open={this.state.addModal} 
					handleClose={()=>this.setState({addModal: false})}
					handleSave={this.handleSave}
					data={this.state.singleTask}
				/>
			</React.Fragment>
		);
	}
}