var React = require('react'),
    SearchIndex = require('./SearchIndex'),
    ClientActions = require('../../actions/client_actions'),
    UserStore = require('../../stores/user'),
    SearchIndexItem = require('./SearchIndexItem');

var SearchIndex = React.createClass({
  getInitialState: function () {
    return({
      searching: false,
      searchString: "",
      users: UserStore.all()
    });
  },
  render: function () {
    var searchIndexItems;

    if (this.state.searching) {
      var users;

      filteredUsers = this.state.users.filter(function (user) {
        var name = (user.first_name + ' ' + user.last_name).toLowerCase();
        return name.match(this.state.searchString.toLowerCase());
      }.bind(this));

      searchIndexItems = filteredUsers.map(function (user) {
          return <SearchIndexItem user={user} key={user.id} />;
        });
    } else {
      searchIndexItems = <div className='notSearching'></div>;
    }

    return (
      <div className='nav-search'>
        <form _onSubmit={this.handleSubmit}
          onBlur={this.hideIndex}>

          <input placeholder='Search Faceplace'
            onChange={this.onChange}
            value={this.state.searchString}
            onFocus={this.showIndex}
            className='search-bar'/>
        </form>

        <div className='search-index-items'>
          {searchIndexItems}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    this.UserListener = UserStore.addListener(this.onUserStoreChange);
  },
  componentWillUnmount: function () {
    this.UserListener.remove();
  },
  onUserStoreChange: function (e) {
    this.setState({users: UserStore.all()});
  },
  showIndex: function (e) {
    if (!this.state.areUsersFetched) {
      ClientActions.fetchUsers();
    }
    this.setState({
      searching: true,
      areUsersFetched: true
    });
  },
  hideIndex: function (e) {
    this.setState({
      searching: false
    });
  },
  onChange: function (e) {
    this.setState({searchString: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();

  }
});

module.exports = SearchIndex;
