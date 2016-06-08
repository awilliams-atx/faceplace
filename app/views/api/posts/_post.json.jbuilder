json.postId post.id
json.body post.body
json.authorId post.author_id
json.postPicUrl post.author.profile_pic.url(:post)
json.fullName post.author.full_name
json.taggedFriends 'ehy'
# do
#   json.array! post.tagged_friends, partial: 'api/tags/tagged_user', as: :user
# end


time = post.created_at.localtime
json.createdAt "#{time.strftime('%B%e')} at #{time.strftime('%l')}:#{time.strftime('%M')}"
