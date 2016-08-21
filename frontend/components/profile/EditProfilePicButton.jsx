var React = require('react')
    UserApiUtil = require('../../util/user_api_util');

var EditProfilePicButton = React.createClass({
  render: function () {
    if (this.props.authorizedToEdit) {
      return (
        <form>
          <div className='profile-pic-input-container'>
            <div className='profile-pic-input-replacement group'>
              <i className="fa fa-camera" aria-hidden="true"></i>
              <strong>Change photo</strong>
            </div>

            <input type='file'
              className='profile-pic-input'
              id='profile-pic-input'
              onChange={this.updateProfilePic}>
            </input>

            <div className='profile-pic-input-cover' />
          </div>
        </form>
      );
    } else {
      return <div id='profile-pic-input'/>;
    }
  },
  updateProfilePic: function (e) {
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

module.exports = EditProfilePicButton;
