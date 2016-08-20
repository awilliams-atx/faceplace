var React = require('react');

var FriendRequestItem = React.createClass({
  render: function () {
    return (
      <div className='friend-request-item group'>
        <div className='friend-request-item-pic nav-drop-block'>
          <img src={this.props.req.profile_pic_url} />
        </div>
        <div className='friend-request-details nav-drop-block'>
          <a href={'#/users/' + this.props.req.user_id}>{this.props.req.name}</a>
          <aside>a million friends</aside>
        </div>
        <div className='friend-request-response'>
          <button className='nav-drop-request-confirm'
            onClick={this.onAccept}>
            Confirm
          </button>
          <button className='nav-drop-request-delete'
            onClick={this.onReject}>
            Delete Request
          </button>
        </div>
      </div>
    );
  },
  onAccept: function (e) {
    console.log('FriendRequestItem#onAccept');
    console.log(this.props.req);

    e.preventDefault();
    this.props.onAccept(this.props.req.maker_id);
  },
  onReject: function (e) {
    console.log('FriendRequestItem#onReject');
    console.log(this.props.req);

    e.preventDefault();
    this.props.onReject(this.props.req.maker_id);
  }
});

module.exports = FriendRequestItem;
