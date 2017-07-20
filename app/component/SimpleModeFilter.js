import PropTypes from 'prop-types';
import React from 'react';
import pure from 'recompose/pure';

import SimpleToggleButton from './SimpleToggleButton';
import ComponentUsageExample from './ComponentUsageExample';


class SimpleModeFilter extends React.Component {
  static propTypes = {
    action: PropTypes.object.isRequired,
    availableModes: PropTypes.array.isRequired,
    selectedModes: PropTypes.array.isRequired,
    buttonClass: PropTypes.string,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  };

  render = () => {
    const widthPercentage = 100 / this.props.availableModes.length;
    const ModeToggleButton = ({ type, stateName }) => {
      if (this.context.config.simpleTransportModes[type].availableForSelection) {
        const action = this.props.action[
          `toggle${type.charAt(0).toUpperCase() + type.slice(1)}State`];
        const selectedModes = this.props.selectedModes;
        const isEnabled = selectedModes.includes(stateName) ||
          selectedModes.includes(type.toUpperCase());
        const onButtonClick = () => {
          this.context.executeAction(action);
        };
        return (<SimpleToggleButton
          icon={`${type}-withoutBox`}
          onBtnClick={onButtonClick}
          state={isEnabled}
          checkedClass={type}
          style={{
            width: `${widthPercentage}%`,
          }}
          className={this.props.buttonClass}
        />);
      }
      return null;
    };

    // TODO we could build the filter strictly based on config
    return (<div className="simple-btn-bar mode-filter no-select">
      <ModeToggleButton type="kaara" />
      <ModeToggleButton type="bus" />
      <ModeToggleButton type="kavely" />
      <ModeToggleButton type="polkupyora" />
      <ModeToggleButton type="rail" />
    </div>);
  }
}

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
