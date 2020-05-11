import React from 'react';
import AllStats from './containers/AllStats/AllStats';
import CountryStats from './containers/CountryStats/CountryStats';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Container from '@material-ui/core/Container';


const app = () => (
  <BrowserRouter>
    <Container fixed>
      <Switch>
        <Route path="/country/:name">
          <CountryStats />
        </Route>
        <Route path="/">
          <AllStats />
        </Route>
      </Switch>
    </Container>
  </BrowserRouter>
);



export default app;