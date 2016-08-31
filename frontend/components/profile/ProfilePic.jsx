var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var ProfilePic = React.createClass({
  getInitialState: function () {
    return { loading: true };
  },
  render: function () {
    return (
      <div id='profile-pic'>
        <img onLoad={this.onLoad}
          ref='profilePic'
          src={this.props.profileOwner.profilePicUrl} />
        {this.renderSpinner()}
        {this.renderEditButton()}
      </div>
    );
  },
  renderEditButton: function () {
    if (this.props.profileOwner.userId === SessionStore.currentUser().id) {
      return (
        <EditButton formName='user[profile_pic]'
          photoType='profile-pic'
          updateUtil='submitProfilePic' />
      );
    }
  },
  renderSpinner: function () {
    if (this.state.loading) {
      return (
        <div id='profile-pic-spinner'>
          <i className='fa fa-spinner fa-spin fa-3x' />
        </div>
      );
    }
  },
  componentWillReceiveProps: function (props) {
    window.pic = this.refs.profilePic
    window.proPicUrl = props.profileOwner.profilePicUrl;
    if (props.profileOwner.profilePicUrl !== this.refs.profilePic.src) {
      this.setState({ loading: true });
    }
  },
  onLoad: function () {
    setTimeout(function () {
      this.setState({ loading: false });
    }.bind(this), 200);
  }
});


module.exports = ProfilePic;
