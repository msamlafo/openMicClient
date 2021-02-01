import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { hasLoginToken } from '../Common/Utility';
import Footer from './Footer';
import './GuestLayout.css';

export type GuestLayoutProps = {};

const GuestLayout: React.FunctionComponent<GuestLayoutProps> = (props) => {
  return (
    <React.Fragment>
      {hasLoginToken() ? (
        <Redirect to="/signout" />
      ) : (
        <>
          {props.children}
          <Footer />
        </>
      )}
    </React.Fragment>
  );
};

export default GuestLayout;
