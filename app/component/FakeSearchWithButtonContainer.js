import PropTypes from 'prop-types';
import React from 'react';
import getContext from 'recompose/getContext';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import FakeSearchBar from './FakeSearchBar';

export const FakeSearchWithButton = ({
  fakeSearchBar, fakeSearchBar2, onClick, onClick2, breakpoint,
}) => (
  <div className={`search-form bp-${breakpoint}`}>
    <div className="small-6 search-form-map-overlay">
      <button title="haku" tabIndex="0" onClick={onClick2} className="noborder search-button flex-horisontal">
        <div className="flex-grow row collapse">
          <div className="small-11 columns">
            {fakeSearchBar2}
          </div>
          <div className="small-1 columns">
            <span className="postfix search cursor-pointer button-icon search-origin-icon">
              <Icon img="icon-icon_position" />
            </span>
          </div>
        </div>
      </button>
    </div>
    <div className="small-6 search-form-map-overlay search-form-map-overlay2">
      <button title="haku" tabIndex="0" onClick={onClick} className="noborder search-button flex-horisontal">
        <div className="flex-grow row collapse">
          <div className="small-11 columns">
            {fakeSearchBar}
          </div>
          <div className="small-1 columns">
            <span className="postfix search cursor-pointer button-icon">
              <Icon img="icon-icon_search" />
            </span>
          </div>
        </div>
      </button>
    </div>
  </div>

);

FakeSearchWithButton.propTypes = {
  fakeSearchBar: PropTypes.object.isRequired,
  fakeSearchBar2: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onClick2: PropTypes.func,
  breakpoint: PropTypes.string,
};

FakeSearchWithButton.defaultProps = {
  breakpoint: 'medium',
};

FakeSearchWithButton.displayName = 'FakeSearchWithButton';

FakeSearchWithButton.description = () => (
  <div>
    <p>
    Visual search component that acts as a link to search dialog.
  </p>
    <ComponentUsageExample description="Centered fake search field with search icon button">
      <FakeSearchWithButton fakeSearchBar={<FakeSearchBar placeholder="Enter address" />} />
    </ComponentUsageExample>
    <ComponentUsageExample description="Centered fake search field with search icon button">
      <FakeSearchWithButton
        breakpoint="large" fakeSearchBar={<FakeSearchBar placeholder="Enter address" />}
      />
    </ComponentUsageExample>
  </div>);

export default getContext(
  { breakpoint: PropTypes.string.isRequired })(FakeSearchWithButton);
