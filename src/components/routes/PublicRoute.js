import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
  component: Component,
  layout: Layout,
  auth,
  isAuthComponent,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthComponent && auth.uid ? (
          <Redirect to="/" />
        ) : (
          <Layout component={Component} {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(PublicRoute);
