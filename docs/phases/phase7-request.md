# Phase 4: Request (1.5 days)

## Rails
### Models
* Request

### Controllers
* Api::RequestsController (create, destroy, index)

### Views
* requests/index.json.jbuilder

## Flux
### Views (React Components)
* `RequestButton`
* `RequestsIndex`
  * `RequestsIndexItem`

### Stores
* Requests

### Actions/Utils
* ServerActions.receiveAllRequests
* ServerActions.receiveSingleRequest
* ServerActions.deleteRequest
* ClientActions.fetchRequests
* ClientActions.createRequest
* ClientActions.destroyRequest

### ApiUtil
* ApiUtil.fetchAllRequests
* ApiUtil.createRequest
* ApiUtil.destroyRequest

## Gems/Libraries
