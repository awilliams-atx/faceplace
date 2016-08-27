var React = require('react'),
    Util = require('../../util/general');

module.exports = function taggedFriends (friends, pushUserRoute) {
  if (friends.length > 0) {
    return (
      <div className='post-tagged-friends'>
        <span className='post-tagged-friends-with'>—with </span>
        {Util.toCommaSeparatedAnchors(friends, pushUserRoute)}
      </div>
    );
  }
};
