import React from 'react';
import Authorized from './components/Authorized/Authorized';
import Unauthorized from './components/Unauthorized/Unauthorized';

function Navigation() {
  const signIn = true;
  return <> { signIn ? <Authorized /> : <Unauthorized /> } </>;
}
export default Navigation;