import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {auth} from '../../firebase/firebase.utils';

import {ReactComponent as Logo} from '../../assests/crown.svg';

import './header.styles.scss';

//note, currentUser intially is null and passed from reducer
const Header = ({currentUser}) => (
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
        </div>
    </div>
);

/**
 * state is the rootReducer 
 * state.user.currentUser == rootReducers, user value, userReducer
 * which is the currentUser value
 * Note! currentUser is the prop/state value that
 * we want to pass into this component
 */
const mapStatetoProps = (state) => ({
    currentUser: state.user.currentUser
});
export default connect(mapStatetoProps)(Header);