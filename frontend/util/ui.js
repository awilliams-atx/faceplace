var ui = { scrollPost: undefined };

var UIManipulator = {
  clearScrollPost: function () {
    ui.scrollPost = undefined;
  },
  scrollPost: function () {
    return ui.scrollPost;
  },
  setScrollPost: function (id) {
    ui.scrollPost = id;
  }
}

module.exports = UIManipulator;
