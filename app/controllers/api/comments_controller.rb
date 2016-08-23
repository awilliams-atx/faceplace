class Api::CommentsController < ApplicationController
  before_action :require_login

  def index
    if params[:post_id]
      commentable_type = 'Post'
    elsif params[:comment_id]
      commentable_type = 'Comment'
    end

    @comments = Comment.all.where('commentable_type = :type AND commentable_id = :id', type: commentable_type, id: params[:post_id] || params[:comment_id])
      .order('comments.created_at ASC')
      .includes(:author)

    render 'api/comments/index'
  end

  def create
    @comment = Comment.new(comment_params)

    @comment.author_id = current_user.id
    if @comment.save
      render 'api/comments/show'
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
  end

  def destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commentable_id, :commentable_type)
  end
end
