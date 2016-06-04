var React = require('react'),
    SessionApiUtil = require('../util/session_api_util'),
    SignUpForm = require('./SignUpForm'),
    SearchIndex = require('./search/SearchIndex'),
    SessionStore = require('../stores/session'),
    FormActions = require('../actions/form_actions');

var Nav = React.createClass({
  getInitialState: function () {
    return SessionStore.currentUser();
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <header className='main-header'>
        <nav className='main-header-nav group'>
          <div className='nav-left group'>
            <div id='faceplace-icon'><a href="#/main">
              <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
            </a></div>
          <SearchIndex />
          </div>
          <div className='nav-right group'>
            <div id='user-icon'>
              <a onClick={this.closeForms} href={'#/users/' + SessionStore.currentUser().id}>
                {this.state.first_name}!
              </a>
            </div>
            <button onClick={this._logout}>Log Out</button>
          </div>
        </nav>
      </header>
    );
  },
  onClick: function (e) {
    FormActions.closeAll();
  },
  _logout: function (e) {
    e.preventDefault();
    SessionApiUtil.logout(function () {
      this.context.router.push('/login');
    }.bind(this));
  }
});

module.exports = Nav;
