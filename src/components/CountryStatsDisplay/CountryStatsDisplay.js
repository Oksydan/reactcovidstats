import React, { Fragment } from 'react';
import DataCard from '../../components/DataCard/DataCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacingBottom: {
    paddingBottom: theme.spacing(3)
  },
}))

const CountryStatsDisplay = ({ data, title }) => {
  const classes = useStyles();

  const dataGrid = data.map(({title, data, type}, i) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <DataCard
          title={title}
          data={data}
          type={type}
        />
      </Grid>
    )
  })

  return (
    <Fragment>
      {title ? 
        <Typography gutterBottom variant="h4" component="h2" align="center" weight="700">
          {title}
        </Typography>
      :
        null
      }
     
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.spacingBottom}
      >
        {dataGrid}
      </Grid>
    </Fragment>
  )

}


export default CountryStatsDisplay;