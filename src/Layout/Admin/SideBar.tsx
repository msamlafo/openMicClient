import * as React from 'react';
import { Nav, Navbar, Collapse } from 'reactstrap';
import UserMenu from '../UserMenu';
import SideBarLinks from './SideBarLinks';

export type SideBarProps = { collapsed: boolean };

const SideBar: React.FC<SideBarProps> = (props) => {
  return (
    <Navbar color="dark" dark expand="lg">
      <Collapse isOpen={!props.collapsed} navbar className="mb-auto">
        <Nav
          navbar
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse mb-auto"
        >
          <SideBarLinks />
          <UserMenu />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default SideBar;
