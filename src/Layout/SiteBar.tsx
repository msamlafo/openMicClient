import React from 'react';
import Header from './Header';
import MainMenuLinks from './MainMenuLinks';
import UserMenu from './UserMenu';

type SiteBarProps = {};

const SiteBar: React.SFC<SiteBarProps> = () => {
  return (
    <div>
      <Header>
        <MainMenuLinks />
        <UserMenu />
      </Header>
    </div>
  );
};

export default SiteBar;
