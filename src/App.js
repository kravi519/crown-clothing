import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.util';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{
      if(userAuth){
       const userRef = createUserProfileDocument(userAuth);
       (await userRef).onSnapshot(snapShot =>{
         this.setState({
           currentUser:{
             id: snapShot.id,
             ...snapShot.data()
           }
         }, () =>{
         console.log(this.state)}
         );
       })        
      }  else{
        this.setState({currentUser: userAuth});
      }     

    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth = null;
  }
  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
       <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signIn' component={SignInSignUpPage} />
        </Switch> 
      </div>
    );
  }

  
}
export default App;