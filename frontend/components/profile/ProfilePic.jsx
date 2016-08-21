var React = require('react'),
    EditButton = require('./EditProfilePicButton'),
    UserApiUtil = require('../../util/user_api_util'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var ProfilePic = React.createClass({
  getInitialState: function () {
    return ({profilePicUrl: this.props.profilePicUrl});
  },
  render: function () {
    if (this.state.profilePicUrl) {
      profilePicUrl = this.state.profilePicUrl;
    } else {
      profilePicUrl = this.props.profilePicUrl;
    }

    return (
      <div className='profile-pic'>
        <img src={profilePicUrl} />
        <EditButton authorizedToEdit={this.authorizedToEdit()}
          updateProfilePicFile={this.updateProfilePicFile}
          />
      </div>
    );
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      profilePicUrl: newProps.profilePicUrl
    });
  },
  authorizedToEdit: function () {
    return this.props.profileOwnerId === SessionStore.currentUser().id;
  },
  updateProfilePicFile: function (e) {
    var profilePicFile = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function() {
      var formData = new FormData();
      formData.append('user[profile_pic]', profilePicFile);
      UserApiUtil.submitProfilePic(formData);
    };

    if (profilePicFile) {
      fileReader.readAsDataURL(profilePicFile);
    }
  }
});


module.exports = ProfilePic;
