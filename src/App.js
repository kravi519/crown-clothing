import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.util';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
class App extends React.Component {
  unsubscribeFromAuth = null
  componentDidMount(){
    const{setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      if(userAuth){
       const userRef = createUserProfileDocument(userAuth);
       (await userRef).onSnapshot(snapShot =>{        
           setCurrentUser({
             id: snapShot.id,
             ...snapShot.data()
           })      
       })        
      }  else{
        setCurrentUser(userAuth);
      }     

    })
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
          <Route path='/signIn' component={SignInSignUpPage} />
        </Switch> 
      </div>
    );
  }  
}

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(App);