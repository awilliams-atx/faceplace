# Phase 4: Update (1.25 days)

## Rails
### Models
* Update

### Controllers
* Api::UpdatesController (create, destroy, index, show, update)

### Views
* updates/index.json.jbuilder
* updates/show.json.jbuilder

## Flux
### Views (React Components)
* `UpdateForm`
* `UpdateIndex`
  * `UpdateIndexItem`

### Stores
* Updates

### Actions
* ServerActions.receiveAllUpdates
* ServerActions.receiveSingleUpdate
* ServerActions.deleteUpdate
* ClientActions.fetchUpdates
* ClientActions.createUpdate
* ClientActions.editUpdate
* ClientActions.destroyUpdate

### ApiUtil
* ApiUtil.fetchAllUpdates
* ApiUtil.createUpdate
* ApiUtil.editUpdate
* ApiUtil.destroyUpdate

## Gems/Libraries
