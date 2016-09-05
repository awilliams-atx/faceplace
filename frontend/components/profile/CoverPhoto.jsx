var React = require('react'),
    Util = require('../../util/general'),
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
        {this.renderName()}
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
  renderName: function () {
    if (this.props.profileOwner.firstName) {
      var fullName = this.props.profileOwner.firstName + ' ' +
        this.props.profileOwner.lastName;
      return <div id='cover-photo-name'>{fullName}</div>;
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
    if (!Util.sameImgUrl(this.refs.coverPhoto,
      props.profileOwner.coverPhotoUrl)) {
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
  }
});


module.exports = CoverPhoto;
