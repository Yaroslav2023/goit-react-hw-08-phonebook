import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
