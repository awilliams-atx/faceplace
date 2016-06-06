var React = require('react'),
    Nav = require('../Nav'),
    SessionStore = require('../../stores/session'),
    SessionActions = require('../../actions/session_actions'),
    ClientActions = require('../../actions/client_actions'),
    CoverPhoto = require('./CoverPhoto'),
    UserStore = require('../../stores/user');

var Profile = React.createClass({
  getInitialState: function () {
    return({user: UserStore.find(parseInt(this.props.params.userId))});
  },
  render: function () {
    var userId = parseInt(this.props.params.userId);

    var authorizedToEdit = userId === SessionStore.currentUser().id;

    var user = this.state.user;
    var coverPhotoUrl = user ? user.coverPhotoUrl : null;

    var profile = (
      <div className='content'>
        <Nav />
        <div className='sub-content'>
          <CoverPhoto imageUrl={coverPhotoUrl}
            authorizedToEdit={authorizedToEdit}
            userId={userId} />
          {this.props.children}
        </div>
      </div>
    );

    return (profile);
  },
  componentDidMount: function () {
    this.UserListener = UserStore.addListener(this.onUserStoreChange);
    ClientActions.fetchUser(parseInt(this.props.params.userId));
  },
  componentWillUnmount: function () {
    this.UserListener.remove();
  },
   componentWillReceiveProps: function (newProps) {
     ClientActions.fetchUser(newProps.params.userId);
   },
  onUserStoreChange: function () {
    this.setState({user: UserStore.find(parseInt(this.props.params.userId))});
  }
});

module.exports = Profile;
