import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

type SiteBarProps = {};

type SiteBarState = {
  collapsed: boolean;
};
class SiteBar extends Component<SiteBarProps, SiteBarState> {
  constructor(props: SiteBarProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="lg">
          <NavLink className="navbar-brand" to="/">
            openMic
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/profile/mine">
                  My Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/signup">
                  SignUp
                </NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret>
                    SignUp/Login
                  </DropdownToggle>
                  <DropdownMenu right className="bg-dark">
                    <DropdownItem className="bg-dark">
                      <NavLink className="nav-link" to="/signup">
                        SignUp
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem className="bg-dark">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default SiteBar;
