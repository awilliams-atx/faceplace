json.userId user.id
json.fullName user.first_name + ' ' + user.last_name
json.thumbUrl asset_path(user.profile_pic.url(:thumb))
