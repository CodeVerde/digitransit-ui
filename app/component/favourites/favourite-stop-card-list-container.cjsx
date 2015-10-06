React             = require 'react'
Relay             = require 'react-relay'
queries           = require '../../queries'
StopCardContainer = require '../stop-cards/stop-card-container'
StopCardList      = require '../stop-cards/stop-card-list'

DEPARTURES_COUNT = 5

class FavouriteStopCardListContainer extends React.Component

  proptypes: {
    stops: React.PropTypes.any.isRequired
  }

  getStopCards: =>
    stopCards = []
    for stop in @props.stops.stops
      stopCards.push <StopCardContainer key={stop.gtfsId} stop={{stop:stop}} departures=DEPARTURES_COUNT />
    stopCards

  render: =>
    <StopCardList className="row" addStops=false>
    	{@getStopCards()}
    </StopCardList>

module.exports = Relay.createContainer(FavouriteStopCardListContainer,
  fragments: queries.FavouriteStopListContainerFragments
  initialVariables:
    ids: null
)
