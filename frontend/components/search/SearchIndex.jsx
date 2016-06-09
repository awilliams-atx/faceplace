var React = require('react'),
    SearchIndex = require('./SearchIndex'),
    ClientActions = require('../../actions/client_actions'),
    SearchStore = require('../../stores/search'),
    SearchIndexItem = require('./SearchIndexItem'),
    SessionStore = require('../../stores/session');

var SearchIndex = React.createClass({
  getInitialState: function () {
    return({
      searching: false,
      searchString: '',
      users: SearchStore.all()
    });
  },
  render: function () {
    var currentUserId = SessionStore.currentUser().id;
    var searchIndexItems = <div className='empty-search-index-items'></div>;

    if (this.state.searching) {
      var users;

      filteredUsers = this.state.users.filter(function (user) {
        var name = (user.firstName + ' ' + user.lastName).toLowerCase();
        return name.match(this.state.searchString.toLowerCase());
      }.bind(this));

      searchIndexItems = filteredUsers.map(function (user) {
        return <SearchIndexItem
          user={user}
          key={user.userId}
          clickHandler={this.hideIndexItems} />;
      }.bind(this));
    }

    return (
      <div className='nav-search' id='search-bar'>
        <form onSubmit={this.handleSubmit} >
          <input placeholder='Search Faceplace'
            onChange={this.onSearchStringChange}
            onFocus={this.showIndexItems}
            className='search-bar' />
        </form>

        <div className='search-index-items overlay'>
          {searchIndexItems}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    this.SearchListener = SearchStore.addListener(this.onSearchStoreChange);
    $(document).keydown(function (event) {
      if (event.which === 27) { this.setState({searching: false}); }
    }.bind(this));
  },
  componentWillUnmount: function () {
    this.SearchListener.remove();
  },
  handleSubmit: function (e) {
    e.preventDefault();
  },
  hideIndexItems: function (e) {
    document.getElementsByTagName('body')[0]
      .removeEventListener('click', this.clickListener);
    this.setState({searching: false});
  },
  onSearchStoreChange: function (e) {
    this.setState({users: SearchStore.all()});
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value}, function () {
      ClientActions.fetchSearchResults(this.state.searchString);
    });
  },
  showIndexItems: function (e) {
    if (this.state.searching) { return; }
    ClientActions.fetchSearchResults(this.state.searchString);

    this.setState({
      searching: true
    }, function () {
      this.clickListener = function (e) {
        var searchBar = document.getElementById('search-bar');

        if (!searchBar.contains(e.target)) {
          this.hideIndexItems();
        }
      }.bind(this);

      document.getElementsByTagName('body')[0]
      .addEventListener('click', this.clickListener);
    });
  }
});

module.exports = SearchIndex;
