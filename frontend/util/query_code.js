var queryCodes = {
  Comment:          'cmt',
  notifiable_type:  'ntp',
  post_id:          'pid',
  Tagging:          'tg',
  TimelinePosting:  'tp'
};

module.exports = function (string) {
  return queryCodes[string];
};
