import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header.component';

//auth is for our google authentication
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    //this is our user state from auth
    //this method is an open subscription and always open
    //letting us know if a user is signed in or out
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        /**
         * onSnapshot is sim to onAuthStateChanged.
         * we get back snapShot as an object which is data
         * related to the userAuth that we possibly stored
         * if it was a new authentication, or the data related 
         * to the user that is already stored in our database
         */
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  //closes our open subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage/>
            ) 
          } 
          />
        </Switch>
      </div>
    );
  }
}

//destructor off our user reducer
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

/**
 *  returns an object where the prop name is
 *  whatever prop we want to pass in that
 *  dispatches the new action we want to pass
 *  which is the setCurrentUser
 * 
 *  get the user object and dispatch which is 
 *  a way for redux to return an action object.
 *  Call our Action setCurrentUser and pass our user
 *  in. So we're invoking setCurrentUser with user that 
 *  will be used as the payload
 */
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);