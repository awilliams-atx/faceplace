json.id comment.id
json.body comment.body

json.commentableId comment.commentable_id
json.commentableType comment.commentable_type

json.createdAt time_ago_in_words(comment.created_at) + ' ago'


json.authorId comment.author_id
json.fullName comment.author.full_name
json.commentPicUrl asset_path(comment.author.profile_pic.url(:comment))
