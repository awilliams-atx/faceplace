var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    LoadActions = require('../../actions/load_actions'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var CoverPhoto = React.createClass({
  render: function () {
    return (
      <div id='cover-photo'>
        <img src={this.props.coverPhotoUrl}
          onLoad={this.finishLoading} />
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
  },
  finishLoading: function () {
    LoadActions.finishLoading('coverPhoto');
  }
});

module.exports = CoverPhoto;
