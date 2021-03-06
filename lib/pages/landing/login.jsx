import React from 'react';
// import { browserHistory } from 'react-router';
import $ from 'jquery';
import Signup from './signup.jsx'
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'; 
import store from '../../store.js';
import * as types from '../../actions/action-types.js';

class Login extends React.Component {
  constructor() {
    super()
  }

  onSubmit(evt) {
    evt.preventDefault();
    const userName = evt.target.elements[0].value;
    const password = evt.target.elements[1].value;
    console.log('in submit');

    console.log('FORM - signing in: ', userName);
    console.log('FORM - password ', password);

    let userInfo = {
      username: userName,
      password: password
    };

    // dont need string data with bodyparser.urlencoded
    // let stringData = JSON.stringify(userInfo);

    $.ajax({
      type: "POST",
      url: "http://localhost:7777/signin",
      data: userInfo,
      success: (dataRetrieved) => {
        console.log('Successful AJAX Get: \n', dataRetrieved);
      },
    }).done((signinUserData) => {
      if (signinUserData === null) {
        alert('user does not exist')
      } else {
        store.dispatch({
          type: types.LOGIN,
          loggedIn: true 
        })
        browserHistory.push('/home');
      }
    })
    
    
   
  }

  render() {
    console.log('from login',this.props.loggedIn)
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="username"/> {' '}
          <input type="password" placeholder="password"/>{' '}
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <h2><Link to='/signup'>No Account? Sign up now!</Link></h2>
      </div>
    )
  }
}

const mapStateToProps = function(store){
  return {
    loggedIn: store.headerState.loggedIn,
  }
}

export default connect(mapStateToProps)(Login);