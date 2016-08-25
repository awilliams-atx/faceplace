var React = require('react');

var NotificationItem = React.createClass({
  render: function () {
    return (
      <div className={'notification-item group' + this.props.checkedClass}>
        <div className='nav-drop-profile-pic nav-drop-block'>
          <img src={this.props.notif.profile_pic_url} />
        </div>
        <div className='notification-details nav-drop-block'>
          {this.props.notif.explanation}
        </div>
      </div>
    );
  },
});

module.exports = NotificationItem;
