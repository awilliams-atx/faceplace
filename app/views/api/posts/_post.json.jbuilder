json.postId post.id
json.body post.body
json.authorId post.author_id
json.postPicUrl asset_path(post.author.profile_pic.url)
json.fullName post.author.full_name

json.createdAt post.created_at

json.taggedFriends do
  json.array! post.tagged_friends, partial: 'api/tags/tagged', as: :tagged
end

if post.profile_owner
  json.profileOwner do
    json.userId post.profile_owner.id
    json.fullName post.profile_owner.full_name
  end
end
