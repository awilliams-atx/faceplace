var React = require('react'),
    ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,

    LogInForm = require('./components/LogInForm'),
    Main = require('./components/Main'),
    IntroForm = require('./components/IntroForm'),

    SessionStore = require('./stores/session'),
    SessionApiUtil = require('./util/session_api_util');

var App = React.createClass({
  render: function () {
    var content = SessionStore.isUserLoggedIn() ? this.props.children : <LogInForm />;
    return (
      <div>
        {content}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Main } onEnter={ _ensureLoggedIn } />
    <Route path='profile' component={ IntroForm }></Route>
  </Route>
);

function _ensureLoggedIn (nextState, replace, asyncDoneCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  } else {
    redirectIfNotLoggedIn();
  }

  function redirectIfNotLoggedIn () {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }
    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  var router = <Router history={hashHistory} routes={routes} />;
  ReactDOM.render(router, root);
});
