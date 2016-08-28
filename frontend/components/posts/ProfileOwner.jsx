var React = require('react');

module.exports = function profileOwner (profileOwner, pushRoute) {
  if (!profileOwner) { return; }
  return (
    <div>
      <div className='friend-post-icon'>
        <i className='fa fa-caret-right' aria-hidden='true'></i>
      </div>
      <div className='friend-post-breakdown'>
        <a href={'/users/' + profileOwner.userId}
          onClick={pushRoute}>
          {profileOwner.fullName}
        </a>
      </div>
    </div>
  );
};
