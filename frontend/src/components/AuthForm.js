import { useState } from 'react';
import { Form, json, Link, redirect, useNavigation, useActionData, useSearchParams } from 'react-router-dom';
import {setAuthenticationToken} from '../util/auth'
import classes from './AuthForm.module.css';

function AuthForm() {
  const [searchParams] = useSearchParams()
  const error = useActionData()
  // const [isLogin, setIsLogin] = useState(true);
  const isLogin = searchParams.get('mode') == 'login' ? true : false
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    <>
      <Form method="POST" className={classes.form}>

        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {
          error && error.message && <p className={classes.error}>{error.message}</p>
        }
        {
          error && error.errors && (
            <ul>
              {
                Object.values(error.errors).map(err => 
                <li className={classes.error} key={err}>
                  <small>{err}</small>
                </li>)
              }
            </ul>
          )
        }
        <p>
          <label htmlFor="email">Email</label>
          <input id="email"  name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submiting...' :'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export async function authAction({request, params}) {
  const mode = new URL(request.url).searchParams.get('mode') || 'login'
  const method = request.method
  const data = await request.formData()
  const authData = {
    email:data.get('email'),
    password:data.get('password')
  }
  if (mode != 'login' && mode != 'signup') {
    throw json({message: 'Unsupported mode'}, {
      status:422
    })
  }
  const response = await fetch(`http://localhost:8080/${mode}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  })
  if(response.status === 401 || response.status === 422) {
    return response
  }
  if (!response.ok) {
    throw json({message: 'something went wrong'}, {
      status:500
    })
  }
  // set the authentication token
  const resData = await response.json()
  setAuthenticationToken(resData.token)
  return redirect('/')

} 

export default AuthForm;
