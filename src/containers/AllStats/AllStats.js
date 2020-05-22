import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { prepareData } from '../../utils/utils';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/UI/Loader/Loader';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import StatsTable from '../../components/StatsTable/StatsTable';


const AllStats = () => {

  const [countriesStats, setCountriesStats] = useState(null);
  const [continentsStats, setContinentsStats] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchStatsData = useFetchData();


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

  const handleSearch = (e) => {
    const value = e.target.value.trim().toLowerCase();

    clearTimeout(timeoutId);

    const searchTimeout = setTimeout(() => {
      const countries = [...countriesStats];
      let filteredCountries;

      if (value.length > 0) {
        filteredCountries = countries.map(el => {
          const name = el.name.toLowerCase();

          if (name.includes(value)) {
            el.display = true;
          } else {
            el.display = false;
          }
          return el;
        })
      } else {
        filteredCountries = countries.map(el => {
          el.display = true;
          return el;
        })
      }

      setCountriesStats(filteredCountries);
    }, 600);

    setTimeoutId(searchTimeout);
  }

  useEffect(() => {
    let fetching = true;

    setLoading(true);
    fetchStatsData({
      endPoint: 'statistics'
    })
    .then((response) => response.json())
    .then((data) => {
      const { response } = data;
      const dataFormated = response.map((country) => prepareData(country));

      const [country, continents] = extractData(dataFormated);

      if (fetching) {
        setCountriesStats(country);
        setContinentsStats(continents);
        setLoading(false);
      }
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });

    return () => fetching = false;
  }, [extractData, fetchStatsData]);

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (countriesStats && continentsStats) {
    content = (
      <Fragment>
        <Typography gutterBottom variant="h4" component="h2" align="center">
          Stats for countries
        </Typography>

        <FormControl>
          <InputLabel htmlFor="country-name">Search for country</InputLabel>
          <Input id="country-name" onChange={handleSearch} />
        </FormControl>

        <StatsTable stats={countriesStats} />
        <Typography gutterBottom variant="h4" component="h2" align="center">
          Stats for continents
        </Typography>
        <StatsTable stats={continentsStats} />
      </Fragment>
    )
  }

  return content;

};


export default AllStats;