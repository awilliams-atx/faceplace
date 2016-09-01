var React = require('react'),
    Util = require('../../util/general'),
    SearchIndex = require('./SearchIndex'),
    ClientActions = require('../../actions/client_actions'),
    SearchStore = require('../../stores/search'),
    SearchIndexItem = require('./SearchIndexItem'),
    SessionStore = require('../../stores/session');

var SearchIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return({
      cursor: 0,
      searching: false,
      searchString: '',
      users: SearchStore.all()
    });
  },
  render: function () {
    return (
      <div id='search-bar-container'>
        <form onSubmit={this.onSubmit}>
          <input autoComplete='off'
            id='search-bar'
            onChange={this.onSearchStringChange}
            onFocus={this.showIndexItems}
            onKeyDown={Util.preventSelectionChange}
            onKeyPress={Util.preventSelectionChange}
            onKeyUp={this.arrowListener}
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
      return this.state.users.map(function (user, idx) {
        // cursor= <- space for Atom text editor render bug
        return(
          <SearchIndexItem idx={idx} key={idx}
            cursor= {this.state.cursor}
            onFollowLink={this.onFollowLink}
            onMouseOver={this.onMouseOver}
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
  arrowListener: function (e) {
    var difference = Util.dirToDifference(e);
    if (!difference) { return }
    var cursor = Util.applyCursorDifference(difference, this.state.cursor);
    cursor = Util.resetCursor(cursor, this.state.users);
    if (cursor !== this.state.cursor) { this.setState({ cursor: cursor }) }
  },
  hideIndexItems: function (e) {
    document.removeEventListener('click', this.clickOutListener);
    this.setState({ searching: false, cursor: undefined });
  },
  onFollowLink: function () {
    if (this.state.cursor === undefined) { return }
    document.removeEventListener('click', this.clickOutListener);
    var id = this.state.users[this.state.cursor].userId;
    this.setState({
      cursor: 0,
      searching: false,
      searchString: ''
    }, function () {
      this.refs.searchBar.blur();
      this.context.router.push('/users/' + id);
      Util.jumpToTop();
    }.bind(this));
  },
  onMouseOver: function (e) {
    if (parseInt(e.target.dataset.idx) !== this.state.cursor) {
      this.setState({ cursor: parseInt(e.target.dataset.idx) });
    }
  },
  onSearchStoreChange: function (e) {
    this.setState({ users: SearchStore.all() }, this.resetCursor);
  },
  onSearchStringChange: function (e) {
    this.setState({ searchString: e.target.value }, function () {
      ClientActions.fetchSearchResults(this.state.searchString);
    });
  },
  onSubmit: function (e) {
    e.preventDefault();
    this.onFollowLink();
  },
  resetCursor: function () {
    var cursor = Util.resetCursor(this.state.cursor,
      this.state.users);
    if (cursor !== this.state.cursor) { this.setState({ cursor: cursor }) }
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
