import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { isLoggedInAsAdmin } from '../Common/Utility';
import Body from './Admin/Body';
import PageContent from './Admin/PageContent';
import SideBar from './Admin/SideBar';
import Header from './Header';

export type AdminLayoutProps = {};

export type AdminLayoutState = {
  collapsed: boolean;
};

class AdminLayout extends React.Component<AdminLayoutProps, AdminLayoutState> {
  constructor(props: AdminLayoutProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    const authorized = isLoggedInAsAdmin();
    return (
      <React.Fragment>
        {authorized ? (
          <div style={{ height: '100vh' }}>
            <Header
              collapsed={this.state.collapsed}
              toggleNavbar={this.toggleNavbar}
            ></Header>
            <Body>
              <SideBar collapsed={this.state.collapsed} />
              <PageContent>{this.props.children}</PageContent>
            </Body>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </React.Fragment>
    );
  }
}

export default AdminLayout;
