var listeners = [];

var ui = {
  editingPost: false,
  fetchingMorePosts: false,
  requestsDropped: false,
  scrollPost: undefined,
  tagging: false
};

var UIManipulator = {
  addListener: function (listener) {
    listeners.push(listener);
  },
  clearScrollPost: function () {
    ui.scrollPost = undefined;
  },
  focusScrollPost: function (post) {
    var textarea = post.getElementsByTagName('textarea')[0];
    if (textarea) { textarea.focus() }
  },
  now: function (toggle) {
    return ui[toggle];
  },
  removeListener: function (listener) {
    for (var i = 0; i < listeners.length; i++) {
      if (listener === listeners[i]) {
        return listeners.splice(i, 1);
      }
    }
  },
  scrollPost: function () {
    return ui.scrollPost;
  },
  scrollToPost: function (id) {
    if (id && ui.scrollPost !== id) { return }
    id = ui.scrollPost;
    var post = document.getElementById(id);
    if (!post) { return }
    window.scrollTo(0, post.offsetTop - 20);
    UIManipulator.styleScrollPost(post);
    UIManipulator.focusScrollPost(post);
    UIManipulator.clearScrollPost();
  },
  set: function (key, val, trigger) {
    ui[key] = val;
    if (trigger) { this.trigger() }
  },
  styleScrollPost: function (post) {
    var head = post.getElementsByClassName('post-head')[0];
    head.className += ' scroll-post-flash';
    setTimeout(function () {
      head.className = head.classList[0];
    }, 1200);
  },
  trigger: function () {
    listeners.forEach(function (listener) { listener() });
  }
}

module.exports = UIManipulator;
