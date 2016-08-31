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
        <form onSubmit={this.handleSubmit} >
          <input autoComplete='off'
            id='search-bar'
            onChange={this.onSearchStringChange}
            onFocus={this.showIndexItems}
            placeholder='Search Faceplace' />
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
          <SearchIndexItem clickHandler={this.hideIndexItems}
            key={user.userId}
            user={user} />
        );
      }.bind(this));
    }
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
        var searchBar = document.getElementById('search-bar-container');

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
