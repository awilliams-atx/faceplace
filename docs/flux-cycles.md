# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.



## Update Cycles

### Updates API Request Actions

* `fetchAllUpdates`
  0. invoked from `UpdatesIndex` `didMount`
  0. `GET /api/updates` is called.
  0. `receiveAllUpdates` is set as the callback.

* `createUpdate`
  0. invoked from post button `onClick`
  0. `POST /api/updates` is called.
  0. `receiveSingleUpdate` is set as the callback.

* `updateUpdate`
  0. invoked from `updateForm` `onSubmit`
  0. `PUT /api/updates/:id` is called.
  0. `receiveSingleUpdate` is set as the callback.

* `destroyUpdate`
  0. invoked from delete button `onClick`
  0. `DELETE /api/updates/:id` is called.
  0. `removeUpdate` is set as the callback.

### Updates API Response Actions

* `receiveAllUpdates`
  0. invoked from an API callback.
  0. `Updates` store updates `_updates`

* `receiveSingleUpdate`
  0. invoked from an API callback.
  0. `Update` store updates `_updates[id]`

* `removeUpdate`
  0. invoked from an API callback.
  0. `Update` store removes `_updates[id]`

### Updates Store Listeners

* `UpdatesIndex` component listens to `Update` store.
* `UpdatesIndexItem` component listens to `Update` store.



## Requests Cycles

### Requests API Request Actions

* `fetchAllRequests`
  0. invoked from `RequestsIndex` `didMount`
  0. `GET /api/users/:user_id/requests` is called.
  0. `receiveAllRequests` is set as the callback.

* `makeRequest`
  0. invoked from add friend button `onClick`
  0. `POST /api/users/:user_id/requests` is called.
  0. `receiveSingleRequest` is set as the callback.

* `acceptRequest`
  0. invoked from accept request button `onClick`
  0. `DESTROY /api/requests/:id` is called.
  0. `receiveSingleAcceptance` is set as the callback.
  0. `POST /api/users/:id/` is called.

* `cancelRequest`
  0. invoked from delete button `onClick`
  0. `DELETE /api/updates/:id` is called.
  0. `removeRequest` is set as the callback.

### Requests API Response Actions

* `receiveAllRequests`
  0. invoked from an API callback.
  0. `Requests` store requests `_requests`

* `receiveSingleRequest`
  0. invoked from an API callback.
  0. `Request` store requests `_requests[id]`

* `receiveSingleAcceptance`
  0. invoked from an API callback.
  0. `Request` store requests `_requests[id]`

* `removeRequest`
  0. invoked from an API callback.
  0. `Request` store removes `_requests[id]`

### Request Store Listeners

* `RequestsIndex` component listens to `Request` store.
* `RequestsIndexItem` component listens to `Request` store.



## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `FriendSearchBar` `onChange` when there is text
  0. `GET /api/friends` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions`

* `removeSearchSuggestions`
  0. invoked from `FriendSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions`

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.



## Friend Cycles

### Friends API Request Actions

* `fetchAllFriends`
  0. invoked from `FriendsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/users/:id/friends` is called.
  0. `receiveAllFriends` is set as the callback.

* `friendFriend`
  0. invoked from new note button `onClick`
  0. `POST /api/users/:id/friends` is called.
  0. `receiveSingleFriend` is set as the callback.

* `fetchSingleFriend`
  0. invoked from `FriendDetail` `didMount`/`willReceiveProps`
  0. `GET /api/users/:id/friends/:id` is called.
  0. `receiveSingleFriend` is set as the callback.

* `unfriendFriend`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/friends/:id` is called.
  0. `removeFriend` is set as the callback.

### Friends API Response Actions

* `receiveAllFriends`
  0. invoked from an API callback.
  0. `Friend` store updates `_friends`

* `receiveSingleFriend`
  0. invoked from an API callback.
  0. `Friend` store updates `_friends[id]`

* `removeFriend`
  0. invoked from an API callback.
  0. `Friend` store removes `_friends[id]`

### Friends Store Listeners

* `FriendsIndex` component listens to `Friend` store.
* `FriendDetail` component listens to `Friend` store.



## Comment Cycle

### Comments API Request Actions

* `fetchComments`
  0. invoked from `CommentsIndex` `didMount`
  0. `GET /api/updates/:id/comments` is called.
  0. `receiveComments` is set as the callback.

* `leaveComment`
  0. invoked on pressing enter
  0. `POST /api/updates/:id/comments` is called.
  0. `receiveSingleComment` is set as the callback.

* `updateComment`
  0. invoked from `updateForm` on pressing enter
  0. `PUT /api/comments/:id` is called.
  0. `receiveSingleComment` is set as the callback.

* `deleteComment`
  0. invoked from delete button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `removeComment` is set as the callback.

### Comments API Response Actions

* `receiveComments`
  0. invoked from an API callback.
  0. `Comments` store updates `_comments`

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments[id]`

* `removeComment`
  0. invoked from an API callback.
  0. `Comment` store removes `_comments[id]`

### Comments Store Listeners

* `CommentsIndex` component listens to `Comment` store.
* `CommentsIndexItem` component listens to `Comment` store.



## Reaction Cycles

### Reactions API Request Actions

* `fetchReactions`
  0. invoked from `Reactions` `didMount`
  0. `GET /api/updates/:id/reactions` is called.
  0. `receiveReactions` is set as the callback.

* `haveReaction`
  0. invoked from reaction icon `onClick`
  0. `POST /api/updates/:id/reactions` is called.
  0. `receiveSingleReaction` is set as the callback.

* `changeReaction`
  0. invoked from `reactionButton` `onClick`
  0. `PUT /api/reactions/:id` is called.
  0. `receiveSingleReaction` is set as the callback.

* `undoReaction`
  0. invoked from delete button `onClick`
  0. `DELETE /api/reactions/:id` is called.
  0. `removeReaction` is set as the callback.

### Reactions API Response Actions

* `receiveAllReactions`
  0. invoked from an API callback.
  0. `Reactions` store reactions `_reactions`

* `receiveSingleReaction`
  0. invoked from an API callback.
  0. `Reaction` store reactions `_reactions[id]`

* `removeReaction`
  0. invoked from an API callback.
  0. `Reaction` store removes `_reactions[id]`

### Reactions Store Listeners

* `Reactions` component listens to `Reaction` store.








































## Note Cycles

### Notes API Request Actions

* `fetchAllNotes`
  0. invoked from `NotesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/notes` is called.
  0. `receiveAllNotes` is set as the callback.

* `createNote`
  0. invoked from new note button `onClick`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the callback.

* `fetchSingleNote`
  0. invoked from `NoteDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notes/:id` is called.
  0. `receiveSingleNote` is set as the callback.

* `updateNote`
  0. invoked from `NoteForm` `onSubmit`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the callback.

* `destroyNote`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/notes/:id` is called.
  0. `removeNote` is set as the callback.

### Notes API Response Actions

* `receiveAllNotes`
  0. invoked from an API callback.
  0. `Note` store updates `_notes`

* `receiveSingleNote`
  0. invoked from an API callback.
  0. `Note` store updates `_notes[id]`

* `removeNote`
  0. invoked from an API callback.
  0. `Note` store removes `_notes[id]`

### Store Listeners

* `NotesIndex` component listens to `Note` store.
* `NoteDetail` component listens to `Note` store.


## Notebook Cycles

### Notebooks API Request Actions

* `fetchAllNotebooks`
  0. invoked from `NotebooksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks` is called.
  0. `receiveAllNotebooks` is set as the callback.

* `createNotebook`
  0. invoked from new notebook button `onClick`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `fetchSingleNotebook`
  0. invoked from `NotebookDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `updateNotebook`
  0. invoked from `NotebookForm` `onSubmit`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `destroyNotebook`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeNotebook` is set as the callback.

### Notebooks API Response Actions

* `receiveAllNotebooks`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks`

* `receiveSingleNotebook`
  0. invoked from an API callback.
  0. `Notebook` store updates `_notebooks[id]`

* `removeNotebook`
  0. invoked from an API callback.
  0. `Notebook` store removes `_notebooks[id]`

### Store Listeners

* `NotebooksIndex` component listens to `Notebook` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when there is text
  0. `GET /api/notes` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions`

* `removeSearchSuggestions`
  0. invoked from `NoteSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions`

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
