import React, { Suspense, useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { authCheckState } from './store/actions/authActionCreator';

const AsyncCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = lazy(() => import('./containers/Orders/Orders'));
const AsyncAuth = lazy(() => import('./containers/Auth/Auth'));

const App = () => {
  
  const isAuthenticated = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  //Could refactor to set functions needed to constants and have them call dispatch

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch])

  const lazyComponent = (Component) => {
    return props => (
      <Suspense fallback={<span>Loading....</span>}>
        <Component {...props}/>
      </Suspense>
    )
  }
  
  let routes = (
      <Switch>
        <Route path='/auth' component={lazyComponent(AsyncAuth)}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    );
    if(isAuthenticated){
      routes = (
        <Switch>
            <Route path='/checkout' component={lazyComponent(AsyncCheckout)}/>
            <Route path='/orders' component={lazyComponent(AsyncOrders)}/>
            <Route path='/auth' component={lazyComponent(AsyncAuth)}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
        </Switch>
      )
    }
    return(
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>
      </div>
    );
}

export default App;
