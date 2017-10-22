var React = require('react'),
    UserApiUtil = require('../../util/user_api_util');

var EditPhotoButton = React.createClass({
  render: function () {
    return (
      <form>
        <div id={this.props.photoType + '-input-container'}>
          <div id={this.props.photoType + '-input-replacement'}
            className='group'>
            <i className="fa fa-camera" aria-hidden="true"></i>
            <strong>Change photo</strong>
          </div>

          <input type='file'
            id={this.props.photoType + '-input'}
            onChange={this.updatePhoto} />

          <div id={this.props.photoType + '-input-cover'} />
        </div>
      </form>
    );
  },
  updatePhoto: function (e) {
    var photoFile = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function() {
      var formData = new FormData();
      formData.append(this.props.formName, photoFile);
      UserApiUtil[this.props.updateUtil](formData);
    }.bind(this);

    if (photoFile) {
      fileReader.readAsDataURL(photoFile);
    }
  }
});

module.exports = EditPhotoButton;
