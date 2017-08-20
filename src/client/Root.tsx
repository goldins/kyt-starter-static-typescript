import React from 'react';
import Router from 'react-router-dom';
import browserHistory from 'react-router-dom';
import routes from '../routes';

// We need a Root component for React Hot Loading.
function Root() {
  return <Router history={browserHistory} routes={routes} />;
}

export default Root;
