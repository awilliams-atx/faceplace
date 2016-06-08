json.array! @authors, partial: 'api/posts/authored_posts' do
  json.array! @posts, partial: 'api/posts/post', as: :post
end
