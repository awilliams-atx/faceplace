var React = require('react'),
    QC = require('../../util/query_code'),
    Util = require('../../util/general'),
    AddFriend = require('./AddFriend'),
    CoverPhoto = require('./CoverPhoto'),
    ProfilePic = require('./ProfilePic'),
    ClientActions = require('../../actions/client_actions'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var Profile = React.createClass({
  getInitialState: function () {
    return ({ user: UserStore.user() });
  },
  render: function () {
    return (
      <div id='content'>
        <div id='profile-sub-content'>
          <div id='profile-top-content'>
            <div id='cover-photo-container'>
              <CoverPhoto profileOwner={this.state.user} />
              <AddFriend profileOwnerId={this.profileOwnerId()} />
            </div>
            <ProfilePic profileOwner={this.state.user} />
            <nav id='profile-nav'>
              <div id='profile-nav-links'>
                <ul>
                  <li>
                    Timeline
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onUserStoreChange);
    ClientActions.fetchUser(this.profileOwnerId());
    Util.jumpToTop();
  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },
  componentWillReceiveProps: function (props) {
    ClientActions.fetchUser(props.params.userId);
  },
  onUserStoreChange: function () {
    this.setState({ user: UserStore.user() });
  },
  profileOwnerId: function () {
    return parseInt(this.props.params.userId);
  }
});

module.exports = Profile;
