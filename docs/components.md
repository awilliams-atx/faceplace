## Component Hierarchy

* `App`
  * `Nav`
    * `SearchIndex`
      * `SearchIndexItem`
    * `ProfileLink`
    * `UpdatesIndexLink`
    * `RequestsIndex`
      * `RequestsIndexItem`
    * `NotificationsIndex`
      * `NotificationsIndexItem`
  * `UpdatesIndex`
    * `StatusForm`
    * `UpdatesIndexItem`
      * `ResponseIndex`
        * `ResponseIndexItem`
      * `UpdatesIndexItemDetail`
      * `Reactions`
      * `CommentsIndex`
        * `CommentsIndexItem`
      * `CommentForm`
  * `Profile`
    * `CoverPhoto`
    * `ProfilePic`
    * `Request`
    * `ProfileNav`
      * `Timeline`
        * `IntroIndex`
          * `IntroIndexItem`
        * `Photos Index`
          * `PhotosIndexItem`
        * `MiniFriendsIndex`
          * `MiniFriendsIndexItem`
        * `StatusForm`
        * `TimelineIndex`
          * `UpdatesIndexItem`
            * `ResponseIndex`
              * `ResponseIndexItem`
            * `CommentsIndex`
              * `Reactions`
              * `CommentsIndexItem`
            * `CommentForm`
      * `AboutIndex`
        * `OverviewIndex`
          * `OverviewIndexItem`
        * `ExperienceIndex`
          * `ExperienceIndexItem`
        * `ResidencesIndex`
          * `ResidencesIndexItem`
        * `BasicInfoIndex`
          * `BasicInfoItem`
      * `FriendsIndex`
        * `FriendsIndexItem`

<!--

1. RESPONSE_INDEX: the bar with "Like", "Comment" and "Share"
2. Not sure where the the top navbar and the friends list component should go. They persist across every page. Are they wrapped up in the "APP" component? Or do they get injected in every other component where appropriate? I think they should be a part of the "App"
3. TIMELINE_INDEX: Same thing as UpdatesIndex, populated only with a user's own updates index items and items from other users where self was tagged.


-->
