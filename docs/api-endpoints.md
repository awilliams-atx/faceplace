# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app



### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`



### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`



## JSON API



### Updates

- `GET /api/updates`
  - feed
- `POST /api/updates`
- `GET /api/:user_id/updates`
  - user timeline
- `GET /api/updates/:id`
- `PATCH /api/updates/:id`
- `DELETE /api/updates/:id`



### Notifications

- `GET /api/notifications`
  - via current_user
- `POST /api/notifications`
  - called on POST update/comment
  - called for every related user (tagging, response to comment, etc.)
- `GET /api/:user_id/notifications`
  - user timeline
- `DELETE /api/notifications/:id`
  - onClick


### Tags
<!-- Not topic tags, but user tags -->

- `GET /api/updates/tags`
  - via current_user
- `POST /api/tags`
  - called on POST update
- `DELETE /api/tags/:id`



### Friends

- `GET /api/:user_id/friends`
  - Friends index/search
- `POST /api/:user_id/friends`
  - create friending
- `GET /api/:user_id/friends/:id`
  - friend icon hover
  - search results
- `DELETE /api/:user_id/friends/:id`
  - destroy friending



### Comments

- `GET /api/updates/:id/comments`
- `GET /api/comments/:id/comments`
- `POST /api/comments`
- `PUT /api/comments/:id`
- `DELETE /api/comments/:id`



### Reactions
<!-- Likes, Loves, Laughs, Wows, Sads, Angries -->

- `GET /api/updates/:id/reactions`
- `GET /api/comments/:id/reactions`
- `POST /api/reactions`
- `PUT /api/reactions/:id`
- `DELETE /api/reactions/id`


### Intros
<!-- Residence, School, Work, Hometown -->

- `GET /api/users/:id/intros`
- `POST /api/intros`
  - via current_user
- `PUT /api/intros`
  - via current_user
