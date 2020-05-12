import React, { useState, useEffect, Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import { formatDate, prepareData } from "../../utils/utils";
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
  }, []);

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (countryStats) {
    console.log(countryStats);
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
        <Grid item xs={6} sm={4}>
          <DataCard
            title="Total cases"
            number={countryStats.totalCases.toLocaleString()}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <DataCard
            title="Total deaths"
            number={countryStats.totalDeaths.toLocaleString()}
            type="danger"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <DataCard
            title="Total recovered cases"
            number={countryStats.recoveredCases.toLocaleString()}
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