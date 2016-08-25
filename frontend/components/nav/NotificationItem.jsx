var React = require('react');

var NotificationItem = React.createClass({
  render: function () {
    return (
      <div className={'notification-item group' + this.props.checkedClass}>
        <div className='notification-item-pic nav-drop-block'>
          <img src={this.props.req.profile_pic_url} />
        </div>
        <div className='notification-details nav-drop-block'>
          {this.props.notif.explanation}
        </div>
      </div>
    );
  },
});

module.exports = NotificationItem;
