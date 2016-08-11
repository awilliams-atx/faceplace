var React = require('react'),
    SessionApiUtil = require('../../util/session_api_util'),
    NavDrops = require('./NavDrops'),
    SignUpForm = require('../SignUpForm'),
    SearchIndex = require('../search/SearchIndex'),
    SessionStore = require('../../stores/session'),
    FormActions = require('../../actions/form_actions');

var Nav = React.createClass({
  getInitialState: function () {
    return ({
      user: SessionStore.currentUser(),
      toggled: false,
      dropToggles: { notifications: false, friendRequests: false }
    });
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
              <i className="fa fa-facebook-official" aria-hidden="true"></i>
            </a></div>
          <SearchIndex />
          </div>
          <div className='nav-right group'>
            <div id='user-icon'>
              <a onClick={this.closeForms} href={'#/users/' + SessionStore.currentUser().id}>
                {this.state.user.first_name}!
              </a>
            </div>
            {NavDrops({
              toggleDrop: this.toggleDrop,
              dropToggles: this.state.dropToggles
            })}
            <button onClick={this.logout}>Log Out</button>
          </div>
        </nav>
      </header>
    );
  },
  logout: function (e) {
    e.preventDefault();
    SessionApiUtil.logout(function () {
      this.context.router.push('/login');
    }.bind(this));
  },
  toggleDrop: function (drop) {
    var dropToggles = { notifications: false, friendRequests: false };
    dropToggles[drop] = true;
    this.setState({dropToggles: dropToggles});
  }
});

module.exports = Nav;
