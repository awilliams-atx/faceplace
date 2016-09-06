# faceplace

![Sample profile][profile_img]

[Live][live]

faceplace is a full-stack web application inspired by Facebook. Major technologies include Ruby on Rails, PostgreSQL, and React.js, and Flux.

## Features & Implementation

#### Single-Page App

Faceplace is a single-page app. The effect of navigating to separate pages is achieved by use of the React Router.

#### Friends

Friendships are stored in a 'friendships' join table in a PostgreSQL database. Friend requests are persisted to a similar table called 'friend_requests'. Friend requests that have been accepted remain in the database, denoting the age of the friendship. Rejected friend requests are removed.

Accepting a friend request gives immediate feeback. The request is moved from a 'Friend Requests' section to an 'Accepted Requests' section. Post and Comment forms appear on the new friend's timeline and below posts involving the new friend.

#### Posts

Posting allows a user to upload content for public consumption. Right now, only text is supported, but images will be added soon.

Submitting a post while visiting a friend's timeline causes the post to be available on the timeline of the author and the visited friend and displays the visited friend's name at the top of the post. A visited friend receives an instant notification of the post via websockets.

#### Tagging

Each Post form has a user search function which enables tagging friends. Tagged friends are displayed below the body of the post. The post will be available on the timeline of both the author and each tagged friend. Tagged friends receive an instant notification of the post via websockets.

#### Friend Requests

Making a friend request is quite a big todo on Faceplace. First of all, the button `Add Friend` is displayed differently based on the current profile a user is visiting. There are five distinct cases:

 * **No buttons**: visiting one's own profile
 * **Add Friend**: visiting a non-friend's profile
 * **Unfriend**: visiting a friend's profile
 * **Confirm / Delete Request**: visiting a non-friend's profile *and* a request has been *received*
 * **Request Sent! / Cancel Request**: visiting a non-friend's profile *and* a request has been *made*

 Making a friend request also sends an instant notification via websockets to the request receiver. Received friend requests are displayed in the 'Friend Requests' section of the navbar with an option to **Confirm** or **Delete Request**.

 Accepted friend requests remain in the Friend Request drop-down menu indefinitely. **In the future**, there will be an option to remove accepted friend requests, and accepted friend requests will automatically remove themselves after a timeout of a few days.

#### Notifications

There are three cases where a notification is pushed out to a user via the [Pusher][Pusher] websockets API:

* A friend has tagged the user in a new post.
* A friend has posted on the user's timeline.
* A user has commented on a post the user is watching.

The notifications appear in the navbar instantaneously. The number of new notifications is displayed inside an attention-grabbing red rectangle. Five notifications are loaded on page load, but more can be loaded via SQL pagination by clicking *Load more notifications* until there are no more to be loaded.

Clicking on a notification navigates to the timeline of either the timeline that was being visited when the post was created or the timeline of the author. Next, the window scrolls down to the post, and an animation is fired on the post head to improve visibility. The comment form is focused to improve UX.

#### Watching a post

In order to send out notifications via websockets, each post adds rows into a `watchings` join table connecting users to the post. By default, the post author, all tagged friends, and the owner of the timeline where the post was submitted are included. Commenting on a post makes the commenter a `watcher`.

**In the future** I would like to implement *unwatching* a post in order to stop receiving notifications.

#### Infinite Scroll

When you scroll down, a window `scroll` event listener picks up the distance from the bottom of the page. If the distance is short enough, it triggers an API call to load more posts. This happens continuously until the API call retrieves zero new posts, past which point the listener does not fire.

#### User Search

Finding new friends is as simple as typing the first couple letters of either their first or last name into the search bar. Results of the search are fetched with each character typed. The drop down list is navigable with both the mouse and keyboard.

#### Cover photo / Profile Picture

When viewing one's own profile page, a small button appears in the corner of both images prompting to change the photo. All user-uploaded images are stored in AWS S3 buckets to ensure scalability.

#### Intro

The Intro (visible from a user's timeline) stores basic personal information input by a user for public display. Each item has a click event listener for the profile owner which transforms the item into a form for updating the information.

## To-Dos for this project:

I am  excited to continue working on this project's development. Some craved features include...

#### Photos / Photo albums

In the future, users will be able to upload a photo instead of or along with a body of text in a post. Photo URLs will all be stored in a photos table and a join table `photo_albums` will store data relating photos to their owners and their containing albums. The photos themselves will be stored in AWS S3 buckets to ensure scalability.

#### Reactions

In the future, users will be able to record their reactions via simple icons including the classic "like" thumbs-up, "love", "anry", "sad", "wow", and "laugh".

#### Private messages

In the future, users will be able to share private messages. The messages table will allow for both text and image content.

**Bonus**: Multi-user chatrooms.

#### Unwatching a post

Right now, users are sent notifications if they are 'watching' a post. Given that a `watching` is just a row in a table, it shouldn't be too much trouble to implement this feature: just delete the row.

Or leave the row in and update a flag `receiving_notifications` to `false`. That way the user can continue to comment on the post. (Commenting would reenter the `watchings` row, turning notifications back on.)

#### Untagging yourself

Right now, only the post author has control over tags. It is important for a user to be able to untag himself to remove association with a post. It shouldn't be too much work to implement this, since tags are implemented via a `taggings` join table connecting users to a post: just delete the row.

Or leave the row in and update a flag `taggable` to `false` to prevent retagging by the post author.

#### Removing a post from your timeline

Right now, if a friend posts something you don't like on your timeline, you have to live with it. Removing the post from the timeline should be as simple as deleting a row from the database in a table called `timeline_postings`.

#### Fuzzy Search

Users make typing and spelling mistakes all the time. This shouldn't prevent them from finding their friends. Right now, I have my eye on the [pg_search][pgsearch] Ruby gem to help implement fuzzy search.

###### Resources:

* [Flux][flux] - Front end state manager and architecture
* [Font Awesome][fa] - Icons
* [jQuery][jquery] - Feature-rich JavaScript library
* [MomentJS][moment] - Time formatting
* [Paperclip][paperclip] - ActiveRecord file attachment library
* [Pusher][pusher] - Websockets API
* [ReactJS][react] - Front end view rendering library
* [react-router][reactrouter] - React routing library


[fa]: http://fontawesome.io/ "Font Awesome"
[flux]: https://github.com/facebook/flux "Flux"
[jquery]: https://jquery.com/ "jQuery"
[live]: http://www.faceplace.io "Live"
[moment]: http://momentjs.com/ "Moment JS"
[paperclip]: https://github.com/thoughtbot/paperclip "Paperclip"
[pgsearch]: https://github.com/Casecommons/pg_search "PG Search"
[profile_img]: ./app/assets/images/user_profile.png "Sample profile"
[pusher]: https://pusher.com/ "Pusher Websockets API"
[react]: https://facebook.github.io/react/ "ReactJS"
[reactrouter]: https://github.com/reactjs/react-router "react-router"
