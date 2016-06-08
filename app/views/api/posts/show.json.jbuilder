json.postBody @post.body
json.authorId current_user.id
json.postPicUrl current_user.profile_pic.url(:post)
json.fullName current_user.full_name
json.createdAt "#{@time.strftime('%B%e')} at #{@time.strftime('%l')}:#{@time.strftime('%M')}"
