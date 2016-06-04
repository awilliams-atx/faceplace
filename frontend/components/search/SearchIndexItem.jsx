var React = require('react');

var SearchIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    var user = this.props.user;

    console.log("user: " + user.id + ", profilePicUrl: " + user.profilePicUrl);
    return (
      <div className='search-index-item group'
        id={user.id}
        onClick={this.clickHandler} >
        <div className='search-icon'><img src={user.profilePicUrl} /></div>
        <div className='search-text'>
          <strong>{user.firstName + ' ' + user.lastName}</strong>
          <br/>
          <small>{user.location}</small>
        </div>
      </div>
    );
  },
  clickHandler: function (e) {
    console.log("SearchIndexItem#clickHandler");
    e.preventDefault();
    this.props.clickHandler();
    this.context.router.push('/users/' + this.props.user.id);
  }
});

module.exports = SearchIndexItem;
