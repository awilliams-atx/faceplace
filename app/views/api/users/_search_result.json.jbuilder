json.userId user.id
json.firstName user.first_name
json.lastName user.last_name
json.location user.location
json.profilePicUrl asset_path(user.profile_pic.url(:search_result))
