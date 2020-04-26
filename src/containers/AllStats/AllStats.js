import React, { useState, useEffect, useCallback } from 'react';
import { API_KEY } from '../../config/config';

import StatsTable from '../../components/StatsTable/StatsTable';

const AllStats = () => {

    const [countriesStats, setCountriesStats] = useState(null);
    const [continentsStats, setContinentsStats] = useState(null);
    const [loading, setLoading] = useState(false);


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

    const prepareData = useCallback(({
      country,
      cases,
      deaths,
      tests
    }) => {
      const dataObject = {
        name: country,
        newCases: cases.new ? +cases.new.replace("+", "") : null,
        activeCases: cases.active,
        criticalCases: cases.critical,
        recoveredCases: cases.recovered,
        totalCases: cases.total,
        newDeaths: deaths.new ? +deaths.new.replace("+", "") : null,
        totalDeaths: deaths.total,
        totalTests: tests.total
      };

      return dataObject;
    }, [])

    useEffect(() => {
      fetch("https://covid-193.p.rapidapi.com/statistics", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
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
    }, [prepareData, extractData]);


    return (
      <div>
        {countriesStats ? <StatsTable stats={countriesStats} /> : null}
      </div>
    );

};


export default AllStats;