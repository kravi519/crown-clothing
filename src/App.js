import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.action';

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount(){
    const{checkUserSession} = this.props;
    checkUserSession();
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth = null;
  }
  render(){   

    return (
      <div>
        <Header />
       <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signIn' render={() => 
            this.props.currentUser ? (<Redirect to='/'/>):(<SignInSignUpPage/>)} />
        </Switch> 
      </div>
    );
  }  
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);