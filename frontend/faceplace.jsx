var React = require('react'),
    ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    Redirect = ReactRouter.Redirect

    LogInForm = require('./components/LogInForm'),
    Main = require('./components/Main'),
    Profile = require('./components/profile/Profile'),
    Timeline = require('./components/profile/timeline/Timeline'),

    LoadStore = require('./stores/load'),
    ModalStore = require('./stores/modal'),
    SessionStore = require('./stores/session'),
    SessionApiUtil = require('./util/session_api_util');

var Socket = require('./vendor/socket');

var App = React.createClass({
  getInitialState: function () {
    return ({
      isModalDisplayed: ModalStore.isModalDisplayed(),
      loading: false
    });
  },
  render: function () {
    return (
      <div id='app'>
        {this.renderFader()}
        {this.renderModal()}
        {this.props.children}
      </div>
    );
  },
  renderFader: function () {
    if (this.state.loading) {
      return <div id='load-fader' />;
    }
  },
  renderModal: function () {
    if (this.state.isModalDisplayed) {
      return (
        <div id='modal-background' className='modal-background-opaque'>
          {ModalStore.modalContent()()}
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.loadListener = LoadStore.addListener(this.onLoadStoreChange);
    this.modalListener = ModalStore.addListener(this.onModalStoreChange);
    this.friendRequestSocket = new Socket('friend_requests');
  },
  componentWillUnmount: function () {
    this.loadListener.remove();
    this.modalListener.remove();
    this.friendRequestSocket.unsubscribe();
  },
  onLoadStoreChange: function () {
    if (LoadStore.loading() && !this.state.loading) {
      this.setState({ loading: true });
    } else if (!LoadStore.loading() && this.state.loading) {
      setTimeout(function () {
        this.setState({ loading: false });
      }.bind(this), 300);
    }
  },
  onModalStoreChange: function () {
    this.setState({
      isModalDisplayed: ModalStore.isModalDisplayed()
    }, function () {
      if (this.refs.autoFocus) { this.refs.autoFocus.focus(); }
    });
  }
});

var routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Main } onEnter={ redirectToProfile } />
    <Route path='login' component={ LogInForm } onEnter={ ensureNotLoggedIn }/>
    <Route path='main' component={ Main } onEnter={ redirectToProfile } />
    <Route path='users/:userId' component={ Profile } onEnter={ ensureLoggedIn } >
      <IndexRoute component={ Timeline } />
      <Route path='timeline' component={ Timeline } />
    </Route>
  </Route>
);

function ensureLoggedIn (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }

    asyncDoneCallback();
  }
}

function ensureNotLoggedIn (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      replace('/');
    }

    asyncDoneCallback();
  }
}

function redirectToProfile (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      replace('/users/' + SessionStore.currentUser().id);
    } else {
      replace('/login')
    }

    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  var router = <Router history={hashHistory} routes={routes} />;
  ReactDOM.render(router, root);
});
