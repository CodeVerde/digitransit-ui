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
    const sortedData = busData.sort((a, b) => (a.shortName > b.shortName));
    const selectOptions = [];
    let count = 0;
    sortedData.forEach((element) => {
      const label = `${element.shortName} (${element.longName})`;
      const linkUrl = `/linjat/${element.gtfsId}/pysakit/${element.patterns[0].code}`;
      selectOptions.push(
        <option value={linkUrl} key={count}>
          {label}
        </option>);
      count += 1;
    });

    return (
      <div className="bus-line-selector small-8 columns">
        <div className="select-wrapper">
          <select className="lines" onChange={this.selectLine}>
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
      A toolbar for selecting a bus line
    </p>
    <ComponentUsageExample>
      <BusLineSelector />
    </ComponentUsageExample>
  </div>;


export default withRouter(BusLineSelector);
