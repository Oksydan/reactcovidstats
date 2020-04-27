import { API_KEY } from '../config/config';

const formatParams = params => {
  let paramsString = '';
  let i = 0;

  for(const param in params) {
    let paramFormated = '';
    if(i === 0) {
      paramFormated += '?';
    } else {
      paramFormated += '&';
    }
    paramFormated += param + '=' + params[param];
    paramsString += paramFormated;
    i++;
  }

  return paramsString;
}

const useFetchData = () => {

  const fetchData = ({ endPoint, params }) => {
    const fetchParams = params ? formatParams(params) : null;
    
    const url = `https://covid-193.p.rapidapi.com/${endPoint}${fetchParams ? fetchParams : ''}`;

    return fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    })
  }

  return fetchData;
}

export default useFetchData;