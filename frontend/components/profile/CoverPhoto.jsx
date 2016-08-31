var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var CoverPhoto = React.createClass({
  getInitialState: function () {
    return { loading: true };
  },
  render: function () {
    return (
      <div id='cover-photo'>
        <img onLoad={this.onLoad}
          ref='coverPhoto'
          src={this.props.profileOwner.coverPhotoUrl} />
        {this.renderSpinner()}
        <div id='cover-photo-name'>{this.name()}</div>
        {this.renderEditButton()}
      </div>
    );
  },
  renderEditButton: function () {
    if (this.props.profileOwner.userId === SessionStore.currentUser().id) {
      return (
        <EditButton formName='user[cover_photo]'
          photoType='cover-photo'
          updateUtil='submitCoverPhoto' />
      );
    }
  },
  renderSpinner: function () {
    if (this.state.loading) {
      return (
        <div id='cover-photo-spinner'>
          <i className="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i>
        </div>
      );
    }
  },
  componentWillReceiveProps: function (props) {
    window.cp = this.refs.coverPhoto;
    window.proCP = props.profileOwner.coverPhotoUrl;
    if (props.profileOwner.coverPhotoUrl !== this.refs.coverPhoto.src) {
      this.setState({ loading: true });
    }
  },
  onLoad: function () {
    setTimeout(function () {
      this.setState({ loading: false });
    }.bind(this), 300);
  },
  authorizedToEdit: function () {
    return this.props.profileOwner.userId === SessionStore.currentUser().id;
  },
  name: function () {
    return this.props.profileOwner.firstName + ' ' +
      this.props.profileOwner.lastName;
  }
});


module.exports = CoverPhoto;
