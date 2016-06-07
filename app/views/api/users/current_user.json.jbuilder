json.id @user.id
json.first_name @user.first_name
json.last_name @user.last_name
json.postPicUrl @user.profile_pic.url(:post)

# json.extract!
# @user,
# :id,
# :first_name,
# :last_name,
# :profile_pic.url
