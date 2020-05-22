import React from 'react';
import AllStats from './containers/AllStats/AllStats';
import CountryStats from './containers/CountryStats/CountryStats';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));


const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container fixed className={classes.spacing}>
        <Switch>
          <Route path="/country/:name/:date?">
            <CountryStats />
          </Route>
          <Route path="/">
            <AllStats />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};



export default App;