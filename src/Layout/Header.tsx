import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import logo from '../Assets/openMicLogo-sm.png';

export type HeaderProps = {
  collapsed: boolean;
  toggleNavbar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <Navbar color="dark" dark expand="lg">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="openMic" />
        </NavLink>
        <NavbarToggler onClick={props.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!props.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            {props.children}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
