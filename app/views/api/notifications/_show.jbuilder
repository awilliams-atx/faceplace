json.notifier do
  json.id notification.notifier_id
  json.name notification.notifier.full_name
  json.profile_pic_url notification.notifier.profile_pic.url
end

json.explanation notification.explanation
