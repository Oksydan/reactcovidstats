import React from 'react';
import DataCard from '../../components/DataCard/DataCard';
import Grid from '@material-ui/core/Grid';


const countryStatsDisplay = ({data, title}) => {

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
    <Grid
      container
      spacing={3}
      direction="row"
      justify="flex-start"
      alignItems="stretch"
    >
      {dataGrid}
    </Grid>
  )

}


export default countryStatsDisplay;