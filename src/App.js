import React, { Component } from 'react';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {authCheckState} from './store/actions/authActionCreator';
import asyncComponent from '../src/hoc/asyncComponent/asyncComponent';

const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentWillMount() {
    this.props.onCheckBrowserAuthData();
  }
  
  render(){
    let routes = (
        <Switch>
          <Route path='/auth' component={AsyncAuth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      );
      if(this.props.isAuthenticated){
        routes = (
          <Switch>
              <Route path='/checkout' component={AsyncCheckout}/>
              <Route path='/orders' component={AsyncOrders}/>
              <Route path='/auth' component={AsyncAuth}/>
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
}

const mapStateToProps = ({auth}) => {
  return {
    isAuthenticated: auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckBrowserAuthData: () => dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
