import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { hasLoginToken } from '../Common/Utility';
import Footer from './Footer';
import SiteBar from './SiteBar';

export type MainLayoutProps = {};

export type MainLayoutState = {
  collapsed: boolean;
};

class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
  constructor(props: MainLayoutProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    const userIsLoggedIn = hasLoginToken();
    return (
      <React.Fragment>
        {userIsLoggedIn ? (
          <>
            <SiteBar
              collapsed={this.state.collapsed}
              toggleNavbar={this.toggleNavbar}
            />
            {this.props.children}
            <Footer />
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

export default MainLayout;
