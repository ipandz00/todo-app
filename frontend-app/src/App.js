import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './pages/Main.js';
import Header from './containers/HeaderContainer.js';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Header />
    <Main />
  </React.Fragment>
)

export default App;
