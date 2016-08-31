var React = require('react');

module.exports = function profileOwner (profileOwner, pushRoute) {
  if (!profileOwner) { return; }
  return (
    <div className='friend-post-breakdown'>
      <i className='fa fa-caret-right' aria-hidden='true'></i>
      <a href={'/users/' + profileOwner.userId}
        onClick={pushRoute}>
        {profileOwner.fullName}
      </a>
    </div>
  );
};
