# Phase 4: Comment (1.25 days)

## Rails
### Models
* Comment

### Controllers
* Api::CommentsController (create, destroy, index, show, update)

### Views
* comments/index.json.jbuilder
* comments/show.json.jbuilder

## Flux
### Views (React Components)
* `CommentsIndex`
  * `CommentsIndexItem`
  * `CommentsForm`

### Stores
* Comments

### Actions/Utils
* ServerActions.receiveAllComments
* ServerActions.receiveSingleComment
* ServerActions.deleteComment
* ClientActions.fetchComments
* ClientActions.createComment
* ClientActions.editComment
* ClientActions.destroyComment

### ApiUtil
* ApiUtil.fetchAllComments
* ApiUtil.createComment
* ApiUtil.editComment
* ApiUtil.destroyComment

## Gems/Libraries
