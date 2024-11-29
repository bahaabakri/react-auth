import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import {getTimeToExpired} from '../util/auth'
function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData()
  const submit = useSubmit()
  const timeToExpired = getTimeToExpired()
  useEffect(() => {
    if(!token) {
      return;
    }
    if(token === 'Expired') {
      submit(null, {
        action: '/logout',
        method: 'POST'
      })
      return;
    }
    setTimeout(() => {
      submit(null, {
        action: '/logout',
        method: 'POST'
      })
    },timeToExpired)
  }, [token, timeToExpired, submit])
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
