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
    return (
      <div id='search-bar-container'>
        <form onSubmit={this.onSubmit} >
          <input autoComplete='off'
            id='search-bar'
            onChange={this.onSearchStringChange}
            onFocus={this.showIndexItems}
            placeholder='Search Faceplace'
            ref='searchBar'
            value={this.state.searchString} />
        </form>
        <div id='search-index' className='overlay'>
          {this.renderSearchIndexItems()}
        </div>
      </div>
    );
  },
  renderSearchIndexItems: function () {
    if (this.state.searching) {
      return this.state.users.map(function (user) {
        return(
          <SearchIndexItem onFollowLink={this.onFollowLink}
            key={user.userId}
            user={user} />
        );
      }.bind(this));
    }
  },
  componentDidMount: function () {
    this.SearchListener = SearchStore.addListener(this.onSearchStoreChange);
  },
  componentWillUnmount: function () {
    this.SearchListener.remove();
  },
  clickOutListener: function (e) {
    if (!this.refs.searchBar.contains(e.target)) {
      this.hideIndexItems();
    }
  },
  hideIndexItems: function (e) {
    document.removeEventListener('click', this.clickOutListener);
    this.setState({ searching: false });
  },
  onFollowLink: function () {
    document.removeEventListener('click', this.clickOutListener);
    this.setState({ searching: false, searchString: '' });
  },
  onSearchStoreChange: function (e) {
    this.setState({ users: SearchStore.all() });
  },
  onSearchStringChange: function (e) {
    this.setState({ searchString: e.target.value }, function () {
      ClientActions.fetchSearchResults(this.state.searchString);
    });
  },
  onSubmit: function (e) {
    e.preventDefault();
  },
  showIndexItems: function (e) {
    if (this.state.searching) { return }
    ClientActions.fetchSearchResults(this.state.searchString);
    this.setState({ searching: true }, function () {
      document.addEventListener('click', this.clickOutListener);
    });
  }
});

module.exports = SearchIndex;
