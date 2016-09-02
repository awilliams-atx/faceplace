var requestListeners = [];
var requests = { justAccepted: [], unchecked: [] };
var listeners = [];
var ui = { scrollPost: undefined, tagging: false };

var UIManipulator = {
  addListener: function (listener) {
    listeners.push(listener);
  },
  clearScrollPost: function () {
    ui.scrollPost = undefined;
  },
  focusScrollPost: function (post) {
    post.getElementsByTagName('textarea')[0].focus();
  },
  friendRequest: {
    accept: function (id) {
      requests.justAccepted.push(id);
      this.remove('unchecked', id);
    },
    addListener: function (listener) {
      requestListeners.push(listener);
    },
    checkAll: function () {
      requests.justAccepted = [];
      requests.unchecked = [];
      this.trigger();
    },
    receive: function (id) {
      requests.unchecked.push(id);
      this.trigger();
    },
    reject: function (id) {
      this.remove('unchecked', id);
    },
    remove: function (set, id) {
      for (var i = 0; i < requests[set].length; i++) {
        if (requests[set][i] === id) {
          requests[set][i].splice(i, 1)
          this.trigger();
          return
        }
      }
    },
    removeListener: function (listener) {
      for (var i = 0; i < requestListeners.length; i++) {
        if (listener === requestListeners[i]) {
          return requestListeners.splice(i, 1);
        }
      }
    },
    trigger: function () {
      requestListeners.forEach(function (listener) { listener() });
    },
    unchecked: function () {
      return requests.unchecked.slice();
    }
  },
  removeListener: function (listener) {
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);
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
    this.styleScrollPost(post);
    this.focusScrollPost(post);
    this.clearScrollPost();
  },
  setScrollPost: function (id) {
    ui.scrollPost = id;
  },
  styleScrollPost: function (post) {
    var head = post.getElementsByClassName('post-head')[0];
    head.className += ' scroll-post-flash';
    setTimeout(function () {
      head.className = head.classList[0];
    }, 1200);
  },
  tagging: function () {
    return ui.tagging;
  },
  toggleTagging: function (bool) {
    ui.tagging = bool;
    this.trigger();
  },
  trigger: function () {
    listeners.forEach(function (listener) { listener() });
  }
}

module.exports = UIManipulator;
