json.postId post.id
json.body post.body
json.authorId @author.id
json.postPicUrl @author.profile_pic.url(:post)
json.fullName @author.full_name

time = post.created_at.localtime
json.createdAt "#{time.strftime('%B%e')} at #{time.strftime('%l')}:#{time.strftime('%M')}"
