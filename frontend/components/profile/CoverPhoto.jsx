var React = require('react'),
    UserStore = require('../../stores/user');

var CoverPhoto = React.createClass({
  render: function () {
    console.log("CoverPhoto#render");

    console.log('url: ' + this.props.imageUrl);
    var imageUrl = this.props.imageUrl;
    var coverPhoto = (
      imageUrl ? <img src={this.props.imageUrl} /> :
        <div className='empty-cover-photo'></div>
    );

    return (
      <div className='cover-photo-container'>
        {coverPhoto}
      </div>
    );
  }
});


module.exports = CoverPhoto;
