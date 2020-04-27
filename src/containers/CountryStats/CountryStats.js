import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { formatDate, prepareData } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';


const CountryStats = props => {
    const { params } = useRouteMatch();
    const history = useHistory();

    const [countryStats, setCountryStats] = useState(null);
    const fetchStatsData = useFetchData();

    
    useEffect(() => {
      const date = formatDate(new Date());

      fetchStatsData({
        endPoint: 'history',
        params: {
          day: date,
          country: params.name
        }
      })
      .then((response) => response.json())
      .then((data) => {
          const { response } = data;

          if (response.length === 0) {
              history.push("/");
          }
          const dataFormated = response
          .map((data) => prepareData(data))
          .reduce((sum, obj) => {
              for (const prop in obj) {
              if (prop !== "name") {
                  sum[prop] =
                  typeof sum[prop] === "undefined"
                      ? 0
                      : sum[prop] + obj[prop];
              } else {
                  sum[prop] = obj[prop];
              }
              }
              return sum;
          }, {});
          console.log(dataFormated);
      
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);

    return params.name;
}

export default CountryStats;