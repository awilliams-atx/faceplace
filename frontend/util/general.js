var React = require('react');

module.exports = {
  toCommaSeparatedAnchors: function (friends) {
    if (friends.length === 0) {
      return '';
    } else {
      return friends.map(function (friend, idx) {
        var separator = ', ';

        if (friends.length === 2) {
          if (idx === friends.length - 2) {
            separator = ' and ';
          }
        } else if (friends.length > 2) {
          if (idx === friends.length - 2) {
            separator = ', and ';
          }
        }

        if (idx === friends.length -1) {
          separator = '';
        }

        return (
          <span key={idx}>
            <a href={'#/users/' + friend.taggedId}>
              {friend.fullName}
            </a>
            {separator}
          </span>
        );
      });
    }
  }
};
