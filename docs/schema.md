# Schema Information

## updates
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      |
image_url   | integer   |
feeling     | integer   |

## profiles
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
owner_id        | integer   | not null, foreign key (references users), indexed, unique
work            | string    |
school          | string    |
current_city    | string    |
home_town       | string    |
cover_photo_url | string    |
profile_pic_url | string    |

## comments
column name     | data type |
----------------|-----------|
id              | integer   | not null, primary key
author_id       | integer   | not null, foreign key (references users), indexed
body            | text      |
image_url       | string    |
commentable_id  | integer   | not null, foreign key (references updates, photos), indexed
comentable_type | string    | not null, table name (updates, photos)

## friend_requests
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
request_maker_id    | integer   | not null, foreign key (references users), indexed, unique [friended_id]
request_receiver_id | integer   | not null, foreign key (references users), indexed, unique [friended_id]
friended_id         | integer   | not null, foreign key (references users), indexed, unique [friender_id]

## friendings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
friender_id   | integer   | not null, foreign key (references users), indexed, unique [friended_id]
friended_id   | integer   | not null, foreign key (references users), indexed, unique [friender_id]

## taggings
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
user_id       | integer   | not null, foreign key, indexed, unique [taggable_id]
taggable_id   | integer   | not null, foreign key, indexed
taggable_type | integer   | not null, table name (updates, photos)

## notifications
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, indexed
actor_id        | integer   | not null, foreign key, indexed
notifiable_id   | integer   | not null, foreign key, (references updates, comments, photos) indexed
notifiable_type | integer   | not null, table name (updates, comments, photos)

## reactions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, indexed
reactable_id    | integer   | not null, foreign key, (references updates, comments, photos) indexed
reactable_type  | integer   | not null, table name (updates, comments, photos)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
