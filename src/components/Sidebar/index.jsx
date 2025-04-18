import React from 'react';
import SidebarView from './SidebarView';
import sidebarItems from './SidebarConfig';

const Sidebar = () => {
  return <SidebarView items={sidebarItems} />;
};

export default Sidebar;
