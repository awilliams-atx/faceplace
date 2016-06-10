# Faceplace

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.faceplace.herokuapp.com

## Minimum Viable Product

Faceplace is a web application inspired by Facebook that will be build using Ruby on Rails and React.js. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] New account creation, login, and guest/demo login
- [x] Smooth, bug-free navigation
- [ ] Adequate seed data to demonstrate the site's features
- [ ] The minimally necessary features for a Facebook-inspired site: an (instant) search bar for finding people, a status update box, a scrolling side-bar friends list, a profile page (cover photo, timeline, personal info, abbreviated friends list), an (infinite) feed, a friends page, friend requests, private messages, and notifications.
- [ ] Given enough time, the website will have event invitations, a photos page, sharing, and will be jazzed up with hover pop-ups! Maybe more!
- [x] Hosting on Heroku
- [x] CSS styling that is satisfactorily visually appealing
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](https://github.com/appacademy/sample-project-proposal/blob/master/docs/production_readme.md) -- you'll write this later)

## Product Goals and Priorities

Faceplace will allow users to do the following:

<!-- This is a Markdown checklist. Use it to keep track of your
progress. Put an x between the brackets for a checkmark: [x] -->

- [x] Create an account (MVP)
- [x] Log in / Log out, including as a Guest/Demo User (MVP)
- [ ] User search (MVP)
- [x] Friending and unfriending (MVP)
- [ ] Friends page (MVP)
- [x] Profile page (MVP)
- [x] Status updates (with or without photos) (MVP)
- [ ] (Infinite) feed (MVP)
- [ ] Reactions (MVP)
- [ ] Who's-online sidebar (MVP)
- [ ] Notifications (MVP)
- [ ] Private messages (MVP)
- [x] Profile editing (non-MVP)
- [ ] Event creation and invitations (non-MVP)
- [ ] Photo albums (non-MVP)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[flux-cycles]: ./docs/flux-cycles.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline



### Phase 1: Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [x] new project
- [x] `User` model
- [x] authentication
- [x] user signup/signin pages
- [x] blank landing page after signin



### Style Sign in/up page (0.5 days)

**Objective:** Make it match Facebook. To completion. No react.

- [x] style to completion



### Phase 2: Bare-bones navbar (for logged-in users) (0.25 days)

**Objective:** Make some space for the navbar.

- [x] navbar header.
- [x] color it, float it, clear-fix it.
- [x] add to App. Render if signed in.



### Phase 3: Profile (1 day)

**Objective:** Profile can be read and edited through the API.

- [ ] `Profile` model
- [ ] seed
- [ ] CRUD API (`ProfilesController`)
- [ ] jBuilder views
- [ ] Webpack & Flux scaffold
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- [ ] React Router (profile timeline page)
- components
  - [ ] `CoverPhoto`
  - [ ] `ProfilePic`
  - [ ] `NameLink`
  - [ ] `Request` (later)
  - [ ] `IntroIndex`
    - [ ] `IntroIndexItem`
    - [ ] `IntroIndexItemForm` (one for each item)



### Style Profile (0.5 days)

**Objective:** Profile matches Facebook.

- [ ] style to completion



### Phase 4: Update (0.75 days)

**Objective:** Updates can be created, read, updated, and destroyed through the API.

- [ ] create `Update` model
- [ ] seed
- [ ] CRUD API (`UpdatesController`)
- [ ] jBuilder views
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- components (on profile timeline page)
  - [ ] `UpdateForm`
  - [ ] `UpdateIndex`
  - [ ] `UpdateIndexItem`



### Style Update (0.5 days)

**Objective:** Update matches Facebook.

- [ ] style to completion



### Phase 5: Comment (0.75 days)

**Objective:** Comments can be created, read, updated, and destroyed through the API.

- [ ] `Comment` model
- [ ] seed
- [ ] CRUD API (`CommentsController`)
- [ ] jBuilder views
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- [ ] React Router (nest under update)
- components
  - [ ] `CommentsIndex`
    - [ ] `CommentsIndexItem`
    - [ ] `CommentsForm`



### Style Comment (0.5 days)

**Objective:** Comment matches Facebook.

- [ ] style to completion



### Phase 6: SearchBar (0.5 days)

**Objective:** Instant search bar yields links to users.

- [ ] Ajax to return users
- [ ] Render based on returned users
- [ ] Inject into navbar
- components
  - [ ] `SearchBar`
    - [ ] `ResultsIndex`
      - [ ] `ResultsIndexItem`



### Style SearchBar (0.5 days)

**Objective:** SearchBar matches Facebook.

- [ ] style to completion



### Phase 7: Request (1 day)

**Objective:** Requests can be created, read, updated, and destroyed through the API.

- [ ] `Request` model
- [ ] seed
- [ ] CRUD API (`RequestsController`)
- [ ] jBuilder views
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- [ ] React Router (nest button under profile)
- components
  - [ ] `RequestButton`
  - [ ] `RequestsIndex`
    - [ ] `RequestsIndexItem`



### Style Request (0.5 days)

**Objective:** Request matches Facebook.

- [ ] style to completion



### Phase 8: Notification (0.75 days)

**Objective:** Notifications can be read, updated, and destroyed through the API. Creation is triggered on update creation.

- [ ] `Notification` model
- [ ] seed
- [ ] CRUD API (`NotificationsController`, `UpdatesController`)
- [ ] jBuilder views
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- [ ] Inject into navbar
- components
  - [ ] `NotificationsIndex`
    - [ ] `NotificationsIndexItem`



### Style Notification (0.5 days)

**Objective:** Notification matches Facebook.

- [ ] style to completion



### Phase 9: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.



### Bonus Features (TBD)
- [ ] Reactions (like, laugh, love...)
- [ ] Tags (on updates)
- [ ] Infinite scroll for newsfeed

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md

<!-- ### Reaction

**Objective:** Reactions can be created, read, updated, and destroyed through the API.

- [ ] create `Reaction` model
- [ ] seed
- [ ] CRUD API (`ReactionsController`)
- [ ] jBuilder views
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- [ ] React Router
- components
-->


<!--
### Tag

**Objective:** Tags can be created, read, updated, and destroyed through the API.

- [ ] create `Tag` model
- [ ] seed
- [ ] CRUD API (`TagsController`)
- [ ] jBuilder views
- [ ] `APIUtil`
- [ ] test API in console
- [ ] flux loop
- [ ] React Router
- components
  - [ ] `CoverPhoto`
  - [ ] `ProfilePic`
  - [ ] `NameLink`
  - [ ] `IntroIndex`
    - [ ] `IntroIndexItem`
    - [ ] `IntroIndexItemForm` (one for each item)
-->
