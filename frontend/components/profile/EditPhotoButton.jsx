var React = require('react')
    UserApiUtil = require('../../util/user_api_util');

var EditPhotoButton = React.createClass({
  render: function () {
    if (this.props.authorizedToEdit) {
      return (
        <form>
          <div className={this.props.photoType + '-input-container'}>
            <div className={this.props.photoType + '-input-replacement group'}>
              <i className="fa fa-camera" aria-hidden="true"></i>
              <strong>Change photo</strong>
            </div>

            <input type='file'
              className={this.props.photoType + '-input'}
              id={this.props.photoType + '-input'}
              onChange={this.updatePhoto} />

            <div className={this.props.photoType + '-input-cover'} />
          </div>
        </form>
      );
    } else {
      return <div id={this.props.photoType + '-input'}/>;
    }
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
