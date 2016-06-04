var React = require('react');

var SearchIndexItem = React.createClass({
  render: function () {
    var user = this.props.user;

    return (
      <a href={'#/users/' + user.id}><div className='search-index-item group' id={user.id}>
        <div className='search-icon'></div>
        <div className='search-text'>
          <strong>{user.first_name + ' ' + user.last_name}</strong>
          <br/>
          <small>{user.location}</small>
        </div>
      </div></a>
    );
  }
});

module.exports = SearchIndexItem;
