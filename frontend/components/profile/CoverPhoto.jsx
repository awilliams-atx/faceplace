var React = require('react'),
    UserStore = require('../../stores/user');

var CoverPhoto = React.createClass({
  render: function () {
    var imageUrl = this.props.imageUrl;
    var coverPhoto = (
      imageUrl ? <img src={this.props.imageUrl} /> :
        <div className='empty-cover-photo'></div>
    );
    return coverPhoto;
  },
  componentWillReceiveProps: function (newProps) {
    this.forceUpdate();
  }
});


module.exports = CoverPhoto;
