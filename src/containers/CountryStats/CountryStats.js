import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { formatDate, prepareData } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/UI/Loader/Loader';


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
    content = countryStats.name;
  }

  return content;
}

export default CountryStats;