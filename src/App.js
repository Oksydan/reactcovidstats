import React from 'react';
import AllStats from './containers/AllStats/AllStats';
import CountryStats from './containers/CountryStats/CountryStats';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './css/reset.css';

const app = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/country/:name">
        <CountryStats />
      </Route>
      <Route path="/">
        <AllStats />
      </Route>
    </Switch>
  </BrowserRouter>
);



export default app;