import React, { Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom';
import AdminUsers from './AdminUsers';
import AdminItems from './AdminItems';

export function AdminBrowser() {
  const allTabs = ['/account/users', '/account/items'];
  const styles = {
    tabs: {
      backgroundColor: 'white',
    },
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <Tabs
                value={location.pathname}
                style={styles.tabs}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab
                  label="Users"
                  value="/account/users"
                  variant="contained"
                  component={Link}
                  to={allTabs[0]}
                />
                <Tab
                  label="Items"
                  value="/account/items"
                  component={Link}
                  to={allTabs[1]}
                />
              </Tabs>
              <Switch>
                <Route path={allTabs[1]} render={() => <AdminItems />} />
                <Route path={allTabs[0]} render={() => <AdminUsers />} />
              </Switch>
            </Fragment>
          )}
        />
      </div>
    </BrowserRouter>
  );
}
