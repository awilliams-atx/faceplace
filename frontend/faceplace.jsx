var React = require('react'),
    ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,

    LogInForm = require('./components/LogInForm'),
    Main = require('./components/Main'),

    SessionStore = require('./stores/session'),
    SessionApiUtil = require('./util/session_api_util');

var App = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={ App }>

    <IndexRoute component={ LogInForm } onEnter={ _ensureNotLoggedIn } />
    <Route path='login' component={ LogInForm } onEnter={ _ensureNotLoggedIn } />
    <Route path='main' component={ Main } onEnter={_ensureLoggedIn } />
  </Route>
);

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  console.log("ensureLoggedIn");
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }

    asyncDoneCallback();
  }
}

function _ensureNotLoggedIn(nextState, replace, asyncDoneCallback) {
  console.log("ensureNotLoggedIn");
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      replace('/main');
    }

    asyncDoneCallback();
  }
}
function _redirectIfNotLoggedIn () {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  var router = <Router history={hashHistory} routes={routes} />;
  ReactDOM.render(router, root);
});
