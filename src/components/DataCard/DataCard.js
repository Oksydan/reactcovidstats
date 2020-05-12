import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    padding: theme.spacing(2)
  },
  success: {
    color: theme.palette.success.dark
  },
  danger: {
    color: theme.palette.error.dark
  },
  muted: {
    color: theme.palette.grey['600']
  }
}))

const DataCard = ({ title, number, type = 'muted' }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.spacing}>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        {title}
      </Typography>
      <Typography variant="h3" component="p" align="center" className={classes[type]}>
        {number}
      </Typography>
    </Paper>
  )
 
}

export default DataCard;