var React = require('react');

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
              onChange={this.props.updateProfilePicFile}>
            </input>

            <div className='profile-pic-input-cover' />
          </div>
        </form>
      );
    } else {
      return <div id='profile-pic-input'/>;
    }
  }
});

module.exports = EditProfilePicButton;
