import React, { useState, useEffect, Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import { prepareData, getPrecentageValue } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/UI/Loader/Loader';
import DataCard from '../../components/DataCard/DataCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CountryStats = props => {
  const { params } = useRouteMatch();
  const history = useHistory();

  const [countryStats, setCountryStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchStatsData = useFetchData();


    
  useEffect(() => {
    
    setLoading(true);
    fetchStatsData({
      endPoint: 'statistics',
      params: {
        country: params.name
      }
    })
    .then((response) => response.json())
    .then((data) => {
      const { response } = data;

      if (response.length === 0) {
        return history.push("/");
      }

      const [countryData] = response;

      const dataFormated = prepareData(countryData);

      setCountryStats(dataFormated);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, [params.name, history, fetchStatsData]);

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (countryStats) {
    content = (
    <Fragment>
      <Typography gutterBottom variant="h3" component="h1" align="center" weight="700">
        {countryStats.name}
      </Typography>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Cases"
            data={[
              {
                label: 'Total',
                value: countryStats.totalCases.toLocaleString()
              },
              {
                label: 'Active',
                value: countryStats.activeCases.toLocaleString()
              }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Deaths"
            data={[
              {
                label: 'Total',
                value: countryStats.totalDeaths.toLocaleString()
              },
              {
                label: 'Lethality rate',
                value: getPrecentageValue(countryStats.totalDeaths, countryStats.totalCases)
              }
            ]}
            type="danger"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataCard
            title="Recovered cases"
            data={[
              {
                label: 'Total',
                value: countryStats.recoveredCases.toLocaleString()
              },
              {
                label: 'Recovered rate',
                value: getPrecentageValue(countryStats.recoveredCases, countryStats.totalCases)
              }
            ]}
            type="success"
          />
        </Grid>
      </Grid>
    </Fragment>
   

    );
  }

  return content;
}

export default CountryStats;