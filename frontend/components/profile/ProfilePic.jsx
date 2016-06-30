var React = require('react'),
    SessionStore = require('../../stores/session'),
    UserApiUtil = require('../../util/user_api_util'),
    UserStore = require('../../stores/user');

var ProfilePic = React.createClass({
  getInitialState: function () {
    return ({profilePicUrl: this.props.profilePicUrl});
  },
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        currentUserId = SessionStore.currentUser().id;

    var authorizedToEdit = (profileOwnerId === currentUserId);

    var editProfilePicButton =
      <div className='empty-edit-profile-pic-button' />;

    if (authorizedToEdit) {
      editProfilePicButton = (
        <form>
          <div className='profile-pic-input-container'>
            <div className='profile-pic-input-replacement group'>
              <i className="fa fa-camera" aria-hidden="true"></i>
              <strong>Change photo</strong>
            </div>

            <input type='file'
              className='profile-pic-input'
              id='profile-pic-input'
              onChange={this.updateProfilePicFile}>
            </input>

            <div className='profile-pic-input-cover' />
          </div>
        </form>
      );
    }

    if (this.state.profilePicUrl) {
      profilePicUrl = this.state.profilePicUrl;
    } else {
      profilePicUrl = this.props.profilePicUrl;
    }

    var profilePic = (
      <div className='profile-pic'>
        <img src={profilePicUrl} />
        {editProfilePicButton}
      </div>
    );

    return profilePic;
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({
      profileOwnerId: newProps.profileOwnerId,
      profilePicUrl: newProps.profilePicUrl
    });
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
