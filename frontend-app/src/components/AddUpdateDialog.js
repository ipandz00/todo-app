import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const AddUpdateDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.type}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={props.title}
          onChange={props.handleInputChange}
          required
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          value={props.description}
          onChange={props.handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUpdateDialog;
