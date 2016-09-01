var React = require('react');

module.exports = function TaggedBoxes (friends, untag) {
  if (friends.length > 0) {
    return (
      <div className='tagged-friends-list group'>
        <div className='tagged-friends-with'>{'— with '}</div>
        {renderNames(friends, untag)}
      </div>
    );
  }
};

function renderNames (friends, untag) {
  return friends.map(function (friend) {
    return (
      <div className='tagged-friends-list-item'
        data-userid={friend.userId}
        key={friend.userId}
        onClick={untag}>
        {friend.fullName}
      </div>
    );
  });
};
