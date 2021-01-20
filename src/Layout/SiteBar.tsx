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
                <NavLink className="nav-link" to="/poetry/create">
                  Write a Poem
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/poetry" exact>
                  All Poems
                </NavLink>
              </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="/poetry/mine" exact>
                  My Poems
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/profile/mine">
                  My Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret>
                    SignUp/Login/SignOut
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
                    <DropdownItem className="bg-dark">
                      <NavLink className="nav-link" to="/signout">
                        SignOut
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
