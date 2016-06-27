var React = require('react'),
    SessionStore = require('../../stores/session'),
    UserApiUtil = require('../../util/user_api_util'),
    UserStore = require('../../stores/user');

var CoverPhoto = React.createClass({
  getInitialState: function () {
    return ({
      coverPhotoUrl: this.props.coverPhotoUrl,
      isEditButtonExpanded: false
    });
  },
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        currentUserId = SessionStore.currentUser().id;

    var authorizedToEdit = (profileOwnerId === currentUserId),
        isEditButtonExpanded = this.state.isEditButtonExpanded;

    var editCoverPhotoButton =
      <div className='empty-edit-cover-photo-button' />;

    var editButtonExpandedClass = '';

    if (isEditButtonExpanded) {
      editButtonExpandedClass = 'edit-button-expanded'
    }

    if (authorizedToEdit) {
      editCoverPhotoButton = (
        <form>
          <div className='cover-photo-input-container'>
            <div className='cover-photo-input-replacement'>
              <i className="fa fa-camera" aria-hidden="true"></i>
              <strong>Change cover photo</strong>
            </div>

            <div className='cover-photo-input-cover' />

            <input type='file'
              className='cover-photo-input'
              id='cover-photo-input'
              onChange={this.updateCoverPhotoFile}
              onMouseEnter={this.toggleExpandEdit}
              onMouseLeave={this.toggleExpandEdit}>
            </input>
          </div>
        </form>
      );
    }

    if (this.state.coverPhotoUrl) {
      coverPhotoUrl = this.state.coverPhotoUrl;
    } else {
      coverPhotoUrl = this.props.coverPhotoUrl;
    }

    var coverPhoto = (
      <div className='cover-photo'
        onMouseEnter={this.toggleExpandEdit}
        onMouseLeave={this.toggleExpandEdit}>
        <img src={coverPhotoUrl} />
        {editCoverPhotoButton}
      </div>
    );

    //   (
    //   coverPhotoUrl ? <img src={this.props.coverPhotoUrl} />;
    // );
    return coverPhoto;
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({coverPhotoUrl: newProps.coverPhotoUrl});
  },
  toggleExpandEdit: function () {
    this.setState({isEditButtonExpanded: !this.state.isEditButtonExpanded});
  },
  updateCoverPhotoFile: function (e) {
    var coverPhotoFile = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function() {
      var formData = new FormData();
      formData.append('user[cover_photo]', coverPhotoFile);
      UserApiUtil.submitCoverPhoto(formData);
    };

    if (coverPhotoFile) {
      fileReader.readAsDataURL(coverPhotoFile);
    }
  }
});


module.exports = CoverPhoto;
