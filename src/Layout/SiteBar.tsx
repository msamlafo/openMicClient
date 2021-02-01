import React from 'react';
import Header from './Header';
import MainMenuLinks from './MainMenuLinks';
import UserMenu from './UserMenu';

type SiteBarProps = {
  collapsed: boolean;
  toggleNavbar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const SiteBar: React.FC<SiteBarProps> = (props) => {
  return (
    <div>
      <Header collapsed={props.collapsed} toggleNavbar={props.toggleNavbar}>
        <MainMenuLinks />
        <UserMenu inNavbar={true}/>
      </Header>
    </div>
  );
};

export default SiteBar;
