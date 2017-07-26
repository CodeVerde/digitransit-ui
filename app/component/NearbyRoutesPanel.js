import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import without from 'lodash/without';

import { intlShape } from 'react-intl';

import BusLinesToggle from './BusLinesToggle';
import BusLineSelector from './BusLineSelector';
import ModeFilterContainer from './ModeFilterContainer';
import NearestRoutesContainer from './NearestRoutesContainer';
import NextDeparturesListHeader from './NextDeparturesListHeader';
import SearchMainContainer from './SearchMainContainer';
import SimpleModeFilterContainer from './SimpleModeFilterContainer';


function NearbyRoutesPanel({ location, currentTime, modes, placeTypes }, context) {
  //   console.log('clickSearch');
  // };

  // const openDialog = (tab) => {
  //   context.router.push({
  //     ...context.location,
  //     state: {
  //       ...context.location.state,
  //       searchModalIsOpen: true,
  //       selectedTab: tab,
  //     },
  //   });
  // };

  const selectedSearchTab =
    context.location.state &&
    context.location.state.selectedTab ?
    context.location.state.selectedTab : 'destination';

  const searchModalIsOpen =
    context.location.state ?
    Boolean(context.location.state.searchModalIsOpen) : false;

  return (
    <div className="frontpage-panel nearby-routes fullscreen">
      <div className="flex-vertical">
        <div className="row btn-simple-bar">
          <SimpleModeFilterContainer
            buttonClass="mode-icon"
          />
        </div>
      </div>
      <div className="flex-vertical">
        <div className="row small-12 small-centered columns">
          <BusLineSelector />
          <BusLinesToggle />
        </div>
      </div>
      <SearchMainContainer
        searchModalIsOpen={searchModalIsOpen}
        selectedTab={selectedSearchTab}
      />
      {context.config.showModeFilter &&
        (<div className="row border-bottom">
          <div className="small-12 column">
            <ModeFilterContainer id="nearby-routes-mode" />
          </div>
        </div>)}
      <NextDeparturesListHeader />
      <div
        className="scrollable momentum-scroll nearby"
        id="scrollable-routes"
      >
        <NearestRoutesContainer
          lat={location.lat}
          lon={location.lon}
          currentTime={currentTime}
          modes={modes}
          placeTypes={placeTypes}
          maxDistance={context.config.nearbyRoutes.radius}
          maxResults={context.config.nearbyRoutes.results || 50}
          timeRange={context.config.nearbyRoutes.timeRange || 7200}
        />
      </div>
    </div>
  );
}

NearbyRoutesPanel.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
  currentTime: PropTypes.number.isRequired,
  modes: PropTypes.array.isRequired,
  placeTypes: PropTypes.array.isRequired,
};

NearbyRoutesPanel.contextTypes = {
  config: PropTypes.object,
  intl: intlShape.isRequired,
  getStore: React.PropTypes.func.isRequired,
  location: PropTypes.object,
  router: PropTypes.object,
};

export default connectToStores(
  NearbyRoutesPanel,
  ['EndpointStore', 'TimeStore', 'ModeStore'],
  (context) => {
    const position = context.getStore('PositionStore').getLocationState();
    const origin = context.getStore('EndpointStore').getOrigin();
    const modes = context.getStore('ModeStore').getMode();
    const bicycleRent = includes(modes, 'BICYCLE_RENT');
    const modeFilter = without(modes, 'BICYCLE_RENT');
    let placeTypeFilter = ['DEPARTURE_ROW', 'BICYCLE_RENT'];

    if (!bicycleRent) {
      pull(placeTypeFilter, 'BICYCLE_RENT');
    } else if (modes.length === 1) {
      placeTypeFilter = ['BICYCLE_RENT'];
    }

    return {
      location: origin.useCurrentPosition ? position : origin,
      currentTime: context.getStore('TimeStore').getCurrentTime().unix(),
      modes: modeFilter,
      placeTypes: placeTypeFilter,
    };
  },
);
