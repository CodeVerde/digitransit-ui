import PropTypes from 'prop-types';
import React from 'react';
import pure from 'recompose/pure';

import SimpleToggleButton from './SimpleToggleButton';
import ComponentUsageExample from './ComponentUsageExample';

class ShowMoreButton extends React.Component {
  constructor() {
    super();
    this.state = {
      showMore: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    if (this.state.showMore === true) {
      this.setState({ showMore: false });
    } else {
      this.setState({ showMore: true });
    }
  }

  render() {
    return (this.state.showMore === true ? (
      <div
        className="cursor-pointer btn-simple mode-icon"
        onClick={this.handleChange}
        style={{
          position: 'relative',
          width: '20%',
          zIndex: '2000',
        }}
      >
        <div className="icon-holder">
          <span ariaHidden="true">
            <svg
              className="icon"
              viewBox="0 0 40 40"
            >
              <use xlinkHref="#icon-icon_arrow-collapse" />
            </svg>
          </span>
        </div>
        <div />
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #999',
            position: 'absolute',
            width: '100%',
          }}
        >
          <a
            className="btn-simple icon-holder"
            href="http://www.finavia.fi/fi/oulu/"
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            <span ariaHidden="true">
              <svg
                className="icon"
                viewBox="0 0 40 40"
              >
                <use xlinkHref="#icon-icon_airplane-withoutBox" />
              </svg>
            </span>
          </a>
          <a
            className="btn-simple icon-holder"
            href="https://shop.vr.fi/vrmobiili/ParseLocationDataForStation.do?query.stationName=Oulu"
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            <span ariaHidden="true">
              <svg
                className="icon"
                viewBox="0 0 40 40"
              >
                <use xlinkHref="#icon_rail-withoutBox" />
              </svg>
            </span>
          </a>
          <a
            className="btn-simple icon-holder"
            href="http://oulu2.ouka.fi/pds/"
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            <span ariaHidden="true">
              <svg
                className="icon"
                viewBox="0 0 40 40"
              >
                <use xlinkHref="#icon-icon_boat-withoutBox" />
              </svg>
            </span>
          </a>
          <a
            className="btn-simple icon-holder"
            href="http://www.finferries.fi/lauttaliikenne/lauttapaikat-ja-aikataulut/hailuoto.html"
            style={{
              display: 'block',
              width: '100%',
            }}
          >
            <span ariaHidden="true">
              <svg
                className="icon"
                viewBox="0 0 40 40"
              >
                <use xlinkHref="#icon-icon_ferry-withoutBox" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    ) : (
      <div
        className="cursor-pointer btn-simple mode-icon"
        onClick={this.handleChange}
        style={{
          width: '20%',
        }}
      >
        <div className="icon-holder">
          <span ariaHidden="true">
            <svg
              className="icon"
              viewBox="0 0 40 40"
            >
              <use xlinkHref="#icon-icon_arrow-collapse" />
            </svg>
          </span>
        </div>
        <div />
      </div>
      )
    );
  }

}

const SimpleModeFilter = (props, context) => {
// class SimpleModeFilter extends React.Component {

  const widthPercentage = 100 / props.availableModes.length;
  const ModeToggleButton = ({ type }) => {
    if (context.config.simpleTransportModes[type].availableForSelection) {
      const action = props.action[
        `toggle${type.charAt(0).toUpperCase() + type.slice(1)}State`];
      const selectedModes = props.selectedModes;
      const isEnabled = selectedModes.includes(type.toUpperCase());
      const onButtonClick = () => {
        context.executeAction(action);
      };
      return (<SimpleToggleButton
        icon={`${type}-withoutBox`}
        onBtnClick={onButtonClick}
        state={isEnabled}
        checkedClass={type}
        style={{
          width: `${widthPercentage}%`,
        }}
        className={props.buttonClass}
      />);
    }
    return null;
  };
  ModeToggleButton.propTypes = {
    type: PropTypes.string.isRequired,
  };

  // TODO we could build the filter strictly based on config
  return (<div className="simple-btn-bar mode-filter no-select">
    <ModeToggleButton type="bus" />
    <ModeToggleButton type="polkupyora" />
    <ModeToggleButton type="walk" />
    <ModeToggleButton type="car" />
    <ShowMoreButton />
  </div>);
};

SimpleModeFilter.propTypes = {
  action: PropTypes.object.isRequired,
  availableModes: PropTypes.array.isRequired,
  selectedModes: PropTypes.array.isRequired,
  buttonClass: PropTypes.string,
};

SimpleModeFilter.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

const pureSimpleModeFilter = pure(SimpleModeFilter);

pureSimpleModeFilter.description = () =>
  <div>
    <p>SimpleModeFilter displays row of transport modes icons for selecting transport modes
    </p>
    <ComponentUsageExample>
      <SimpleModeFilter
        selectedModes={['BUS', 'TRAM']}
        action={{
          toggleBusState: () => {},
          toggleTramState: () => {},
        }}
        buttonClass=""
      />
    </ComponentUsageExample>

    <p>For &lsquo;nearby white buttons&rsquo;</p>
    <div className="nearby-routes">
      <ComponentUsageExample>
        <SimpleModeFilter
          selectedModes={['BUS', 'TRAM']}
          action={{
            toggleBusState: () => {},
            toggleTramState: () => {},
          }}
          buttonClass="btn mode-nearby"
        />
      </ComponentUsageExample>
    </div>
  </div>;

pureSimpleModeFilter.displayName = 'SimpleModeFilter';

export default pureSimpleModeFilter;
