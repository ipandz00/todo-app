import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    <Grid 
      container 
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={4}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            {props.data.title}
          </Typography>
          <Typography component="p">
            {props.data.description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(TaskDetails);