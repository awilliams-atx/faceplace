var React = require('react'),
    Util = require('../../../../util/general');

var FriendIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <a href={'/users/' + this.props.friend.user_id}
        onClick={this.pushUserRoute}
        className='friend-thumb tinter-after'>
        <img src={this.props.friend.profile_pic_url} />
        <div className='friend-thumb-name'>
          {this.props.friend.fullName}
        </div>
      </a>
    );
  },
  pushUserRoute: function (e) {
    e.preventDefault();
    this.context.router.push(e.currentTarget.pathname);
    Util.jumpToTop();
  }
});

module.exports = FriendIndexItem;
