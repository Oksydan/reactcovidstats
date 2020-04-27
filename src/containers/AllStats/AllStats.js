import React, { useState, useEffect, useCallback } from 'react';
import { prepareData } from '../../utils/utils';
import useFetchData from '../../hooks/useFetchData';

import StatsTable from '../../components/StatsTable/StatsTable';

const AllStats = () => {

    const [countriesStats, setCountriesStats] = useState(null);
    const [continentsStats, setContinentsStats] = useState(null);
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

    useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
    }, [extractData]);


    return (
      <div>
        {countriesStats ? <StatsTable stats={countriesStats} /> : null}
      </div>
    );

};


export default AllStats;