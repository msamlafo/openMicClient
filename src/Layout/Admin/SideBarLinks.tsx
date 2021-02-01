import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export type SideBarLinksProps = {};

const SideBarLinks: React.FC<SideBarLinksProps> = (props) => {
  return (
    <div className="position-sticky pt-3">
      <ul className="nav flex-column text-left pl-2">
      <NavItem>
          <NavLink className="nav-link" to="/" exact>
            <i className="fa fa-home mr-2" />
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/issue" exact>
            <i className="fa fa-flag mr-2" />
            Flagged Poems
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/profile" exact>
            <i className="fa fa-users mr-2" />
            Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/other" exact>
            <i className="fa fa-phone mr-2" />
            Other
          </NavLink>
        </NavItem>
      </ul>
      <hr/>
    </div>
  );
};

export default SideBarLinks;
