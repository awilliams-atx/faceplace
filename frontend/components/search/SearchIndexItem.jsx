var React = require('react'),
    Util = require('../../util/general');

var SearchIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    var user = this.props.user;

    return (
      <div className='search-index-item group'
        data-idx={this.props.idx}
        id={user.id}
        onClick={this.onFollowLink}
        onMouseOver={this.props.onMouseOver} >
        <div className='search-icon'><img src={user.profilePicUrl} /></div>
        <div className='search-text'>
          <strong>{user.firstName + ' ' + user.lastName}</strong>
          <br/>
          <small>{user.location}</small>
        </div>
      </div>
    );
  },
  onFollowLink: function (e) {
    e.preventDefault();
    this.props.onFollowLink();
    this.context.router.push('/users/' + this.props.user.userId);
    Util.jumpToTop();
  }
});

module.exports = SearchIndexItem;
