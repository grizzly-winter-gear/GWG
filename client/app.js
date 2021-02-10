import React from 'react';

import { Navbar } from './components';
import Routes from './routes';
import CSS_Baseline from "@material-ui/core/CssBaseline";
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <CssBaseline>
    <div>
      <Navbar />
      <Routes />
    </div>
    </CssBaseline>
  );
};

export default App;
