var React = require('react'),
    EditButton = require('./EditProfilePicButton'),
    SessionStore = require('../../stores/session');

var ProfilePic = React.createClass({
  getInitialState: function () {
    return ({profilePicUrl: this.props.profilePicUrl});
  },
  render: function () {
    return (
      <div className='profile-pic'>
        <img src={this.props.profilePicUrl} />
        <EditButton authorizedToEdit={this.authorizedToEdit()}
          updateProfilePicFile={this.updateProfilePicFile}
          />
      </div>
    );
  },
  componentWillReceiveProps: function (props) {
    this.setState({profilePicUrl: props.profilePicUrl});
  },
  authorizedToEdit: function () {
    return this.props.profileOwnerId === SessionStore.currentUser().id;
  }
});


module.exports = ProfilePic;
