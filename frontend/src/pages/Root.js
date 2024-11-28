import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import {getTimeToExpired} from '../util/auth'
function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData()
  
  const timeToExpired = getTimeToExpired()
  console.log(timeToExpired);
  
  const submit = useSubmit()
  useEffect(() => {
    if (token && timeToExpired) {
      setTimeout(() => {
        submit(null, {
          action: '/logout',
          method: 'POST'
        })
      },timeToExpired)
    }
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
