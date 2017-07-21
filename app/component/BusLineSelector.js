import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

import busData from './BusLineSelectorOuluData';

class BusLineSelector extends React.Component {
  selectLine = ({ target }) => {
    this.props.router.push(target.value);
  };

  render() {
    const selectOptions = [];
    let count = 0;
    busData.forEach((element) => {
      const label = `${element.item.shortName} (${element.item.longName})`;
      const linkUrl = `/linjat/${element.item.gtfsId}/pysakit/${element.item.patterns[0].code}`;
      selectOptions.push(
        <option value={linkUrl} key={count}>
          {label}
        </option>);
      count += 1;
    });

    return (
      <div className="time-selectors">
        <div className="select-wrapper">
          <select className="arrive" onChange={this.selectLine}>
            {selectOptions}
          </select>
          <Icon className="fake-select-arrow" img="icon-icon_arrow-dropdown" />
        </div>
      </div>
    );
  }
}

BusLineSelector.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

BusLineSelector.contextTypes = {
  // intl: intlShape.isRequired,
};

BusLineSelector.displayName = 'BusLineSelector';

BusLineSelector.description = () =>
  <div>
    <p>
      A toolbar for changing arriveBy/departAt, date and time
    </p>
    <ComponentUsageExample>
      <BusLineSelector />
    </ComponentUsageExample>
  </div>;


export default withRouter(BusLineSelector);
