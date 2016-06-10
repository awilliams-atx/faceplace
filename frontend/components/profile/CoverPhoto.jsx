var React = require('react'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var CoverPhoto = React.createClass({
  render: function () {
    var profileOwnerId = this.props.profileOwnerId,
        currentUserId = SessionStore.currentUser().id;

    var authorizedToEdit = (profileOwnerId === currentUserId);

    var editCoverPhotoButton =
      <div className='empty-edit-cover-photo-button' />;

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
              id='cover-photo-input'>
            </input>
          </div>
        </form>
      );
    }
    var imageUrl = this.props.imageUrl;
    var coverPhoto = (
      <div className='cover-photo'>
        <img src={this.props.imageUrl} />
        {editCoverPhotoButton}
      </div>
    );

    //   (
    //   imageUrl ? <img src={this.props.imageUrl} />;
    // );
    return coverPhoto;
  },
  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  }
});


module.exports = CoverPhoto;
