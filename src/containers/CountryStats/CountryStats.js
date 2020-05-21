import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import { prepareData, getPrecentageValue, formatDate } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/UI/Loader/Loader';
import Typography from '@material-ui/core/Typography';
import { DatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CountryStatsDisplay from '../../components/CountryStatsDisplay/CountryStatsDisplay';

const useStyles = makeStyles((theme) => ({
  spacingBottom: {
    marginBottom: theme.spacing(2)
  }
}))


const CountryStats = props => {
  const { params } = useRouteMatch();
  const history = useHistory();
  const classes = useStyles();

  const [countryStats, setCountryStats] = useState(null);
  const [historyCountryStats, setHistoryCountryStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(params.date ? params.date : formatDate(new Date()));
  const fetchStatsData = useFetchData();

  const handleDateChange = useCallback((dataObj) => {
    const date = formatDate(dataObj._d);
    const { name } = params;
    history.push(`/country/${name}/${date}`);
    setSelectedDate(date);
  }, [setSelectedDate, history, formatDate, params]);
    
  useEffect(() => {
    let fetching = true;

    const {name} = params;

    setLoading(true);
    setHistoryCountryStats(null);
    const today = formatDate(new Date());
    let countryHistory = null;
    let countryStats = null;

    const isPastDateSelected = today !== selectedDate;

    (async () => {
      if (isPastDateSelected) {
        countryHistory = await fetchStatsData({
          endPoint: 'history',
          params: {
            country: name,
            day: selectedDate
          }
        })
        .then((response) => response.json())
        .then((data) => {
          const { response } = data;

          if (fetching) {
            const [countryData] = response;

            return prepareData(countryData);
          }

        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      }

      countryStats = await fetchStatsData({
        endPoint: 'statistics',
        params: {
          country: name
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const { response } = data;

        if (fetching) {
          const [countryData] = response;

          return prepareData(countryData);
        }

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });


      if (isPastDateSelected) {
        setHistoryCountryStats(countryHistory);
      }
      setCountryStats(countryStats);
      setLoading(false);
    })();


    return () => fetching = false;
  }, [params, history, fetchStatsData, selectedDate, formatDate]);


  function valueDifference(val1, val2, formatToLocaleString = false) {
    let returnValue;
    let diff = val1 - val2;
        diff = diff.toFixed(2);
        diff = +diff.toString().replace('.00', '');

      
    if (formatToLocaleString) {
      returnValue = diff.toLocaleString();
    } else {
      returnValue = diff;
    }
    

    return diff > 0 ? '+' + returnValue : returnValue;
  }


  function formatCountryData(data, comapreData = null) {
    return [
      {
        title: "Cases",
        data: [
          {
            label: 'Total',
            value: data.totalCases.toLocaleString(),
            difference: comapreData ? valueDifference(data.totalCases, comapreData.totalCases, true) : null
          },
          {
            label: 'Active',
            value: data.activeCases.toLocaleString(),
            difference: comapreData ? valueDifference(data.activeCases, comapreData.activeCases, true) : null
          }
        ]
      },
      {
        title: "Deaths",
        data: [
          {
            label: 'Total',
            value: data.totalDeaths.toLocaleString(),
            difference: comapreData ? valueDifference(data.totalDeaths, comapreData.totalDeaths, true) : null
          },
          {
            label: 'Lethality rate',
            value: getPrecentageValue(data.totalDeaths, data.totalCases) + '%',
            difference: comapreData ? valueDifference(getPrecentageValue(data.totalDeaths, data.totalCases), getPrecentageValue(comapreData.totalDeaths, comapreData.totalCases)) + '%' : null
          }
        ],
        type: "danger"
      },
      {
        title: "Recovered cases",
        data: [
          {
            label: 'Total',
            value: data.recoveredCases.toLocaleString(),
            difference: comapreData ? valueDifference(data.recoveredCases, comapreData.recoveredCases, true) : null
          },
          {
            label: 'Recovered rate',
            value: getPrecentageValue(data.recoveredCases, data.totalCases) + '%',
            difference: comapreData ? valueDifference(getPrecentageValue(data.recoveredCases, data.totalCases), getPrecentageValue(comapreData.recoveredCases, comapreData.totalCases)) + '%' : null
          }
        ],
        type: "success"
      }
    ]
  }


  let content = null;
  let pastStats = null;

  if (loading) {
    content = <Loader />;
  }

  if (countryStats) {

    let presentData;

    if (historyCountryStats) {

      presentData = formatCountryData(countryStats);
      pastStats = formatCountryData(historyCountryStats, countryStats);

    } else {
      presentData = formatCountryData(countryStats);
    }

    content = (
      <Fragment>
        <Typography gutterBottom variant="h3" component="h1" align="center" weight="700">
          {countryStats.name}
        </Typography>
      
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Box component="div" align="center" className={classes.spacingBottom} >
            <DatePicker
              autoOk
              label="Select date"
              disableFuture
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Box>
        </MuiPickersUtilsProvider>

        {historyCountryStats ? <CountryStatsDisplay data={pastStats} title={'Data from ' + selectedDate.split('-').reverse().join('.')} /> : null}

        
        <CountryStatsDisplay data={presentData} title={historyCountryStats ? "Present statistics" : null} />


        
      </Fragment>
    );
  }

  return content;
}

export default CountryStats;