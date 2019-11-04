import React, { Component } from 'react';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {authCheckState} from './store/actions/authActionCreator';

class App extends Component {
  componentWillMount() {
    this.props.onCheckBrowserAuthData();
  }

  
  render(){
    let routes = (
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
      );
      if(this.props.isAuthenticated){
        routes = (
          <Switch>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders}/>
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
