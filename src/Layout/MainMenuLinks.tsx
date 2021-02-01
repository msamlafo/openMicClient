import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export type MainMenuLinksProps = {};

const MainMenuLinks: React.FC<MainMenuLinksProps> = () => {
  return (
    <>
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
    </>
  );
};

export default MainMenuLinks;
