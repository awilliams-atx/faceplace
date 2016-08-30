var React = require('react'),
    ErrorStore = require('../stores/error'),
    ErrorActions = require('../actions/error_actions'),
    UserApiUtil = require('../util/user_api_util');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      errors: ErrorStore.errors('signUp')
    });
  },
  render: function () {
    return (
      <div id='sign-up-content' className='group'>
        <section id='propaganda'>
          <h1>Face it. You pretty much have to use this website.</h1>
            <div className='propaganda-line group'>
              <div className='propaganda-image'>
                <img src={window.feedUrl}/>
              </div>
              <div className='propaganda-text'>
                <span className='bold-text'>Faces </span> to feed on.
              </div>
            </div>
            <div className='propaganda-line group'>
              <div className='propaganda-image'>
                <img src={window.timelineUrl}/>
              </div>
              <div className='propaganda-text'>
                <span className='bold-text'>Face</span> the sands of time.
              </div>
            </div>
            <div className='propaganda-line group'>
              <div className='propaganda-image'>
                <img src={window.searchUrl}/>
              </div>
              <div className='propaganda-text'>
                <span className='bold-text'>The perfect face </span> is one search away.
              </div>
            </div>
        </section>

        <section id='sign-up'>
          <div id='sign-up-header'>
            <h1>Sign Up</h1>
            <div id="consolation">It's free and you pretty much have no choice.</div>
          </div>
          <form id="sign-up-form" onSubmit={this.onSubmit}>
            {this.renderInput('first_name', 'First name')}
            {this.renderInput('last_name', 'Last name')}
            {this.renderInput('email', 'Email')}
            {this.renderInput('password', 'Password')}
            <button>Give In</button>
          </form>
        </section>
      </div>
    );
  },
  renderError: function (errorName) {
    if (this.state.errors && this.state.errors[errorName]) {
      return (
        <aside className='error-container sign-up-error' >
          {this.state.errors[errorName]}
        </aside>
      );
    }
  },
  renderInput: function (inputName, placeholder) {
    return (
      <div className='sign-up-input-container group'>
        <input id={inputName}
          onBlur={this.onInputBlur}
          onChange={this.onInputChange}
          placeholder={placeholder}
          ref={inputName}
          type={inputName === 'password' ? 'password' : ''}
          value={this.state[inputName]} />
        {this.renderError(inputName)}
      </div>
    );
  },
  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.onErrorStoreChange);
  },
  componentWillUnmount: function () {
    this.errorListener.remove();
  },
  blurListener: function (e) {
    if (!['sign-up-input', 'error-container sign-up-error']
      .includes(e.target.className)) {
        ErrorActions.clearErrors('signUp');
        document.removeEventListener('click', this.blurListener);
    }
  },
  focusErrorInputField: function () {
    var fields = ['first_name', 'last_name', 'email', 'password'];
    for (var i = 0; i < fields.length; i++) {
      if (this.state.errors[fields[i]]) {
        this.refs[fields[i]].focus();
        return;
      }
    }
  },
  onErrorStoreChange: function () {
    this.setState({errors: ErrorStore.errors('signUp')}, function () {
      if (ErrorStore.lastAction('SIGN_UP_ERRORS_RECEIVED')) {
        document.addEventListener('click', this.blurListener);
        this.focusErrorInputField();
      }
    }.bind(this));
  },
  onInputBlur: function (e) {
    ErrorActions.clearSignUpError(e.target.id);
  },
  onInputChange: function (e) {
    var state = {}
    state[e.target.id] = e.target.value;
    this.setState(state);
  },
  onSubmit: function (e) {
    e.preventDefault();
    UserApiUtil.signUp({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }, function () {
      this.context.router.push('/users/' + SessionStore.currentUser().id);
    }.bind(this));
  }
});

module.exports = SignUpForm;
