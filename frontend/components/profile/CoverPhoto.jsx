var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var CoverPhoto = React.createClass({
  render: function () {
    return (
      <div className='cover-photo'>
        <img src={this.props.coverPhotoUrl} />
        <EditButton authorizedToEdit={this.authorizedToEdit()}
          updateUtil='submitCoverPhoto'
          formName='user[cover_photo]'
          photoType='cover-photo'
          />
      </div>
    );
  },
  authorizedToEdit: function () {
    return this.props.profileOwnerId === SessionStore.currentUser().id;
  }
});


module.exports = CoverPhoto;
