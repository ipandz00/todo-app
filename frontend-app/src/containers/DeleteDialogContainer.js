import React, { Component } from 'react';
import DeleteDialog from '../components/DeleteDialog.js';

export default class DeleteDialogContainer extends Component {
	render() {
		return (
			<DeleteDialog
				open={this.props.open}
				handleClose={this.props.getAnswer}
			/>
			);
	}
}