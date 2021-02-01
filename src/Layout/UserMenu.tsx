import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  NavItem,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

export type UserMenuProps = {inNavbar?:boolean};

const UserMenu: React.FunctionComponent<UserMenuProps> = (props) => {
  return (
    <>
      <NavItem>
        <UncontrolledDropdown nav inNavbar={props.inNavbar}>
          <DropdownToggle nav>
            <i className="fa fa-2x fa-user-circle" />
          </DropdownToggle>
          <DropdownMenu right className="bg-dark p-0">
            <DropdownItem className="bg-dark m-0 p-0 text-center">
              <NavLink className="nav-link " to="/profile/mine">
                Profile
              </NavLink>
            </DropdownItem>
            <DropdownItem className="bg-dark m-0 p-0 text-center">
              <NavLink className="nav-link" to="/signout">
                Sign Out
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </NavItem>
    </>
  );
};

UserMenu.defaultProps={
  inNavbar:false,
}
export default UserMenu;
