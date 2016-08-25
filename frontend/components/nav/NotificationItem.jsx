var React = require('react');

var NotificationItem = React.createClass({
  render: function () {
    return (
      <div className={'notification-item group' + this.props.checkedClass}>
        <img src={this.props.notif.profile_pic_url}
          className='nav-drop-profile-pic nav-drop-block' />
        <div className='notification-details nav-drop-block'>
          {this.props.notif.explanation}
        </div>
      </div>
    );
  }
});

module.exports = NotificationItem;
