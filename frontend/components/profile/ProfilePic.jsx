var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var ProfilePic = React.createClass({
  render: function () {
    return (
      <div className='profile-pic'>
        <img src={this.props.profilePicUrl} />
        <EditButton authorizedToEdit={this.authorizedToEdit()}
          updateUtil='submitProfilePic'
          formName='user[profile_pic]'
          photoClassName='profile-pic'
          />
      </div>
    );
  },
  authorizedToEdit: function () {
    return this.props.profileOwnerId === SessionStore.currentUser().id;
  }
});


module.exports = ProfilePic;
