var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    LoadActions = require('../../actions/load_actions'),
    SessionStore = require('../../stores/session');

var ProfilePic = React.createClass({
  render: function () {
    return (
      <div id='profile-pic'>
        <img src={this.props.profilePicUrl}
          onLoad={this.finishLoading} />
        <EditButton authorizedToEdit={this.authorizedToEdit()}
          updateUtil='submitProfilePic'
          formName='user[profile_pic]'
          photoType='profile-pic'
          />
      </div>
    );
  },
  authorizedToEdit: function () {
    return this.props.profileOwnerId === SessionStore.currentUser().id;
  },
  finishLoading: function () {
    LoadActions.finishLoading('profilePic');
  }
});


module.exports = ProfilePic;
