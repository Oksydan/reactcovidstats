import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { prepareData } from '../../utils/utils';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/UI/Loader/Loader';
import { makeStyles } from '@material-ui/core/styles';

import StatsTable from '../../components/StatsTable/StatsTable';

const useStyles = makeStyles(() => ({
  heading: {
    textAlign: 'center'
  }
}))

const AllStats = () => {

  const [countriesStats, setCountriesStats] = useState(null);
  const [continentsStats, setContinentsStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchStatsData = useFetchData();
  const classes = useStyles();


  const extractData = useCallback((data) => {
    const continents = [];

    const continentsNames = ['North-America', 'Europe', 'Asia', 'South-America', 'Oceania', 'Africa'];

    const country = data.filter(el => {
      if(continentsNames.indexOf(el.name) >= 0) {
        continents.push(el);
        return false;
      } else {
        if (el.name === 'All') {
          continents.push(el);
        } 
        return true;
      }
    })

    return [country, continents];
  }, [])

  useEffect(() => {
    setLoading(true);
    fetchStatsData({
      endPoint: 'statistics'
    })
    .then((response) => response.json())
    .then((data) => {
      const { response } = data;
      const dataFormated = response.map((country) => prepareData(country));

      const [country, continents] = extractData(dataFormated);

      setCountriesStats(country);
      setContinentsStats(continents);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, [extractData]);

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (countriesStats && continentsStats) {
    content = (
      <Fragment>
        <h2 className={classes.heading}>Stats for countries</h2>
        <StatsTable stats={countriesStats} />
        <h2 className={classes.heading}>Stats for continents</h2>
        <StatsTable stats={continentsStats} />
      </Fragment>
    )
  }

  return content;

};


export default AllStats;