var React = require('react');

module.exports = {
  jumpToQueryStringPost: function () {
    var post_id = this.queryString('post_id');
    if (post_id) { window.location.hash = post_id }
  },
  jumpToTop: function () {
    window.scrollTo(0, 0);
  },
  toCommaSeparatedAnchors: function toCSAnchors (friends, handler) {
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
            <a href={'/users/' + friend.taggedId}
              onClick={handler}>
              {friend.fullName}
            </a>
            {separator}
          </span>
        );
      });
    }
  },
  queryString: function queryString (key) {
    // NB: Breaks if hash is present in URL.
    var query = window.location.search.substring(1);
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return(null);
  }
};
