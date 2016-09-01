var React = require('react'),
    Moment = require('moment'),
    QC = require('./query_code');

module.exports = {
  applyCursorDifference: function(difference, cursor) {
    cursor = (cursor === undefined) ? difference - 1 : cursor + difference;
    return (cursor < 0) ? undefined : cursor;
  },
  autogrow: function (op) {
    if (op.body.length === 0) {
      op.textarea.style.height = op.emptyHeight + 'px';
    } else {
      op.autogrower.textContent = op.body;
      op.autogrower.style.display = 'block';
      op.textarea.style.height =
        (op.autogrower.clientHeight - op.difference).toString() + 'px';
      op.autogrower.style.display = 'none'
    }
  },
  dirToDifference: function (e) {
    if (e.key === 'ArrowUp') {
      return -1
    } else if (e.key === 'ArrowDown') {
      return 1;
    }
  },
  findSelfOrParent: function (node, nodeName) {
    if (node.tagName === nodeName) {
      return node;
    } else {
      return this.findSelfOrParent(node.parentNode, nodeName);
    }
  },
  jumpToTop: function () {
    window.scrollTo(0, 0);
  },
  moment: function (datetime) {
    var currentTime = new Date();
    if (currentTime - new Date(datetime) < 86400000) {
      return Moment(datetime).fromNow();
    } else {
      return Moment(datetime).format("dddd, MMMM Do YYYY, h:mm a");
    }
  },
  pathMatch: function (pathname) {
    return window.location.pathname.match(pathname);
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
  },
  resetCursor: function (cursor, list) {
    if (cursor === undefined ||
      (list.length === 0 && cursor !== undefined)) {
      return undefined
    } else if (cursor >= list.length) {
      return list.length - 1
    } else {
      return cursor
    }
  },
  sameImgUrl: function (img, url) {
    return (!img.attributes.src || img.attributes.src.value !== url) ? false :
      true;
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
  }
};
