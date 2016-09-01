var React = require('react');

var SearchIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    var user = this.props.user;

    return (
      <div className={this.className() + 'search-index-item group'}
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
  className: function () {
    if (this.props.idx === this.props.cursor) {
      return 'selected-search-item ';
    } else {
      return '';
    }
  },
  onFollowLink: function (e) {
    e.preventDefault();
    this.props.onFollowLink();
  }
});

module.exports = SearchIndexItem;
