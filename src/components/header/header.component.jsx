import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from  '../cart-dropdown/cart-dropdown.component';

import {ReactComponent as Logo} from '../../assests/crown.svg';

import './header.styles.scss';


//note, currentUser intially is null and passed from reducer
const Header = ({currentUser, hidden}) => (
    <div className="header">
       
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/shop">
                CONTACT
            </Link> 
            {
                //note! auth.signOut() will sign a user out
                currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                ):(
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
             <CartIcon/>
        </div>
        {
            hidden ? null : <CartDropdown/>
        }
        
    </div>
);

/**
 * state is the rootReducer 
 * state.user.currentUser == rootReducers, user value, userReducer
 * which is the currentUser value
 * Note! currentUser is the prop/state value that
 * we want to pass into this component
 * 
 * prevously used:
 * const mapStatetoProps = (state) => ({
    currentUser: state.user.currentUser
   });

 */
const mapStatetoProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
});
export default connect(mapStatetoProps)(Header);