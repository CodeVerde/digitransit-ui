import PropTypes from 'prop-types';
import React from 'react';
import { intlShape, FormattedMessage } from 'react-intl';
import { routerShape, locationShape } from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Tab from 'material-ui/Tabs/Tab';
import cx from 'classnames';
import without from 'lodash/without';

import { setEndpoint, setUseCurrent } from '../action/EndpointActions';
import FakeSearchBar from './FakeSearchBar';
import FakeSearchWithButtonContainer from './FakeSearchWithButtonContainer';
import SearchInputContainer from './SearchInputContainer';
import SearchModal from './SearchModal';
import SearchModalLarge from './SearchModalLarge';
import Icon from './Icon';
import { getAllEndpointLayers, withCurrentTime } from '../util/searchUtils';


class SearchMainContainer extends React.Component {
  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
    router: routerShape.isRequired,
    location: locationShape.isRequired,
    intl: intlShape.isRequired,
    breakpoint: PropTypes.string.isRequired,
  };

  static propTypes = {
    className: PropTypes.string,
    searchModalIsOpen: PropTypes.bool.isRequired,
    selectedTab: PropTypes.string.isRequired,
    simpleModeData: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    if (this.props.searchModalIsOpen) {
      this.focusInput(this.props.selectedTab);
    }
  }

  onTabChange = tab => this.changeToTab(tab.props.value)

  onSuggestionSelected = (name, item) => {
    if (item.properties.link) {
      const newLocation = {
        ...this.context.location,
        state: {
          ...this.context.location.state,
          searchModalIsOpen: false,
        },
        pathname: item.properties.link,
      };
      return this.context.router.replace(newLocation);
    }

    const locationWithTime = withCurrentTime(this.context.getStore, this.context.location);
    const locationWithTimeAndMode = {
      ...locationWithTime,
      query: {
        ...locationWithTime.query,
        modes: this.getModes(),
      },
    };

    if (item.type === 'CurrentLocation') {
      this.context.executeAction(setUseCurrent, {
        target: this.props.selectedTab,
        router: this.context.router,
        location: locationWithTime,
      });
    } else {
      this.context.executeAction(setEndpoint, {
        target: this.props.selectedTab,
        router: this.context.router,
        location: locationWithTimeAndMode,
        endpoint: {
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0],
          address: name,
        },
      });
    }

    return this.closeModal();
  }

  getModes() {
    let simpleModeBasedDefaults = '';
    if (this.props.simpleModeData.carState === true) {
      simpleModeBasedDefaults = 'CAR';
    } else if (this.props.simpleModeData.bicycleState === true) {
      simpleModeBasedDefaults = 'BICYCLE';
    } else if (this.props.simpleModeData.walkState === true) {
      simpleModeBasedDefaults = 'WALK';
    } else {
      simpleModeBasedDefaults = 'BUS,WALK';
    }

    return simpleModeBasedDefaults;
  }

  searchInputs = [];

  clickSearch = () => {
    const origin = this.context.getStore('EndpointStore').getOrigin();
    const geolocation = this.context.getStore('PositionStore').getLocationState();
    const hasOrigin = origin.lat || (origin.useCurrentPosition && geolocation.hasLocation);

    this.openDialog(hasOrigin ? 'destination' : 'origin');
  }

  clickOrigin = () => {
    this.openDialog('origin');
  }

  openDialog = (tab) => {
    this.context.router.push({
      ...this.context.location,
      state: {
        ...this.context.location.state,
        searchModalIsOpen: true,
        selectedTab: tab,
      },
    });
  }

  focusInput = tab => (
    this.searchInputs[tab] && this.searchInputs[tab].focus()
  )

  closeModal = () => this.context.router.goBack()

  changeToTab(tabname) {
    this.context.router.replace({
      ...this.context.location,
      state: {
        ...this.context.location.state,
        selectedTab: tabname,
      },
    });
    this.focusInput(tabname);
  }

  renderEndpointTab = (tabname, tablabel, placeholder, type, layers) => (
    <Tab
      className={`search-header__button${this.props.selectedTab === tabname ? '--selected' : ''}`}
      label={tablabel}
      value={tabname}
      id={tabname}
      onActive={this.onTabChange}
    >{this.props.selectedTab === tabname &&
      <SearchInputContainer
        ref={(c) => { this.searchInputs[tabname] = c; }}
        id={`search-${tabname}`}
        placeholder={placeholder}
        type={type}
        layers={layers}
        close={this.closeModal}
        onSuggestionSelected={this.onSuggestionSelected}
      />}
    </Tab>
  );

  render() {
    const origin = this.context.getStore('EndpointStore').getOrigin();
    const destinationPlaceholder = this.context.intl.formatMessage({
      id: 'destination-placeholder',
      defaultMessage: 'Enter destination, route or stop',
    });
    const originPlaceholder = origin.address;
    /* const originPlaceholder = this.context.intl.formatMessage({
      id: 'origin-placeholder',
      defaultMessage: 'Enter origin',
    });*/

    const fakeSearchBar = (
      <div>
        <FakeSearchBar
          placeholder={destinationPlaceholder}
          id="front-page-search-bar"
        />
      </div>);

    const fakeSearchBar2 = (
      <div>
        <FakeSearchBar
          placeholder={originPlaceholder}
          id="front-page-origin-bar"
        />
      </div>);

    const Component = this.context.breakpoint === 'large' ? SearchModalLarge : SearchModal;

    let searchLayers = getAllEndpointLayers();
    if (origin.useCurrentPosition) { // currpos-currpos routing not allowed
      searchLayers = without(searchLayers, 'CurrentPosition');
    }

    return (
      <div
        className={cx(
          'fake-search-container', `bp-${this.context.breakpoint}`, this.props.className,
        )}
      >
        <FakeSearchWithButtonContainer
          fakeSearchBar={fakeSearchBar}
          fakeSearchBar2={fakeSearchBar2}
          onClick={this.clickSearch}
          onClick2={this.clickOrigin}
        />
        <Component
          selectedTab={this.props.selectedTab}
          modalIsOpen={this.props.searchModalIsOpen}
          closeModal={this.closeModal}
        >
          {this.renderEndpointTab(
            'origin',
            <div>
              <FormattedMessage id="origin" defaultMessage="Origin" />
              <br />
              <span className="search-current-origin-tip">
                {!origin.useCurrentPosition ? origin.address : [
                  <Icon img="icon-icon_position" key="icon" />,
                  <FormattedMessage
                    key="text"
                    id="own-position"
                    defaultMessage="Your current location"
                  />,
                ]}
              </span>
            </div>,
            this.context.intl.formatMessage({
              id: 'origin',
              defaultMessage: 'Origin',
            }),
            'endpoint',
            searchLayers,
          )}
          {this.renderEndpointTab(
            'destination',
            <div>
              <FormattedMessage id="search" defaultMessage="Search" />
              <br />
              <span className="search-current-origin-tip">
                <FormattedMessage
                  id="place-route-or-keyword"
                  defaultMessage="Destination, route or stop"
                />
              </span>
            </div>,
            this.context.intl.formatMessage({
              id: 'place-route-or-keyword',
              defaultMessage: 'Destination, route or stop',
            }),
            'all',
            searchLayers,
          )}
        </Component>
      </div>
    );
  }
}

export default connectToStores(
  SearchMainContainer,
  ['SimpleModeStore'],
  context => ({
    simpleModeData: context.getStore('SimpleModeStore').getData(),
  }),
);
