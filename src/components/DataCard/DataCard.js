import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    padding: theme.spacing(2)
  },
  success: {
    color: theme.palette.success.dark
  },
  mediumBold: {
    fontWeight: 500
  },
  danger: {
    color: theme.palette.error.dark
  },
  muted: {
    color: theme.palette.grey['600']
  }
}))

const DataCard = ({ title, data, type = 'muted' }) => {
  const classes = useStyles();

  const dataElements = data.map((el, i) => (
    <Grid item xs={6} key={i}>
      <Typography variant="subtitle1" component="p" align={i > 0 ? 'right' : 'left'} className={classes[type]}>
        {el.label}
      </Typography>
      <Typography variant="h5" component="p" align={i > 0 ? 'right' : 'left'} className={[classes[type], classes.mediumBold].join(' ')}>
        {el.value}
      </Typography>
    </Grid>
  ))

  return (
    <Paper className={classes.spacing}>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        {title}
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {dataElements}
      </Grid>
    </Paper>
  )
 
}

export default DataCard;