import React from 'react';
import Authorized from './components/Authorized/Authorized';
import Unauthorized from './components/Unauthorized/Unauthorized';

function Navigation({ signIn }) {
  return <> { signIn ? <Authorized /> : <Unauthorized /> } </>;
}
export default Navigation;