var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var ProfilePic = React.createClass({
  render: function () {
    return (
      <div id='profile-pic'>
        <img src={this.props.profileOwner.profilePicUrl} />
        {this.renderEditButton()}
      </div>
    );
  },
  renderEditButton: function () {
    if (this.props.profileOwner.userId === SessionStore.currentUser().id) {
      return (
        <EditButton formName='user[profile_pic]'
          photoType='profile-pic'
          updateUtil='submitProfilePic' />
      );
    }
  }
});


module.exports = ProfilePic;
