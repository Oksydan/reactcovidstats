import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { API_KEY } from "../../config/config";
import { formatDate } from '../../utils/utils';

const CountryStats = props => {
    const { params } = useRouteMatch();

    const [countryStats, setCountryStats] = useState(null);

    
     useEffect(() => {
        const date = formatDate(new Date());

        fetch(
          `https://covid-193.p.rapidapi.com/history?day=${date}&country=${params.name}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": API_KEY,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const { response } = data;

            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        }, []);

    return (
        'assdadsasad'
    )
}

export default CountryStats;