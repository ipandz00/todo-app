import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const TaskDetails = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="h3" component="h3" gutterBottom={true}>
        {props.data.title}
      </Typography>
      <Typography component="subheading" gutterBottom={true}>
       {props.data.description}
      </Typography>
      <Typography component="h6" gutterBottom={true}>
        <b>Created at:</b> {props.data.createdAt}
      </Typography>
      <Typography component="h6" gutterBottom={true}>
       <b>Internal ID:</b> {props.data._id}
      </Typography>
    </Paper>
  );
}

export default withStyles(styles)(TaskDetails);