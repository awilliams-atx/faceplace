var React = require('react');

module.exports = function TaggedBoxes (friends, untag) {
  if (Object.keys(friends).length > 0) {
    return (
      <div className='tagged-friends-list group'>
        <div className='tagged-friends-with'>{'— with '}</div>
        {renderNames(friends, untag)}
      </div>
    );
  }
};

function renderNames (friends, untag) {
  return Object.keys(friends).map(function (id) {
    return (
      <div className='tagged-friends-list-item'
        data-userid={id}
        key={id}
        onClick={untag}>
        {friends[id].fullName}
      </div>
    );
  });
};
