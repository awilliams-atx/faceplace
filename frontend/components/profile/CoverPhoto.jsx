var React = require('react'),
    UserStore = require('../../stores/user'),
    AddFriend = require('./AddFriend');

var CoverPhoto = React.createClass({
  render: function () {
    var imageUrl = this.props.imageUrl;
    var coverPhoto = (
      imageUrl ? <img src={this.props.imageUrl} /> :
        <div className='empty-cover-photo'></div>
    );

    return (
      <div className='cover-photo-container'>
        {coverPhoto}
        <AddFriend userId={this.props.userId} />
      </div>
    );
  }
});


module.exports = CoverPhoto;
