var React = require('react')
    UserApiUtil = require('../../util/user_api_util');

var EditPhotoButton = React.createClass({
  render: function () {
    var photoClass = this.props.photoClassName;
    if (this.props.authorizedToEdit) {
      return (
        <form>
          <div className={photoClass + '-input-container'}>
            <div className={photoClass + '-input-replacement group'}>
              <i className="fa fa-camera" aria-hidden="true"></i>
              <strong>Change photo</strong>
            </div>

            <input type='file'
              className={photoClass + '-input'}
              id={photoClass + '-input'}
              onChange={this.updatePhoto} />

            <div className={photoClass + '-input-cover'} />
          </div>
        </form>
      );
    } else {
      return <div id={photoClass + '-input'}/>;
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
