import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Items from './pages/Items';
import ItemsTable from './pages/Items/components/ItemTable';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Items} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
