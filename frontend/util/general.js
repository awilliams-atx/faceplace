var React = require('react'),
    QC = require('./query_code');

module.exports = {
  jumpToTop: function () {
    window.scrollTo(0, 0);
  },
  pathMatch: function (pathname) {
    return window.location.pathname.match(pathname);
  },
  scrollToPost: function (id) {
    var post = document.getElementById(id);
    if (post && post.offsetTop) {
      window.scrollTo(0, post.offsetTop - 10)
      return true
    }
    return false
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
    key = QC(key);
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
