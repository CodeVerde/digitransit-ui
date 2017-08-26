import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';

import { isBrowser } from '../../../util/browser';
// import { getJsonWithHeaders } from '../../../util/xhrPromise';
// import { cleanJson } from '../../../util/ouluUtils';
import Card from '../../Card';

export default class TrafficFluencyPopupContainer extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    // lineId: PropTypes.string.isRequired,
    loading: PropTypes.func.isRequired,
    popupData: PropTypes.shape({
      name: PropTypes.string,
      timestamp: PropTypes.string,
      description: PropTypes.string,
      fluencyText: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      popupContent: null,
    };
  }

  componentWillMount() {
    this.updateObjects();
  }

  updateObjects() {
    const newObj = (
      <Card className="padding-small">
        <div className="card-header">
          <div className="card-header-wrapper">
            <span className="oulu-card-header-primary">
              {this.props.popupData.name}
            </span>
            <div className="card-sub-header">
              Kesto: {this.props.popupData.timestamp}
            </div>
          </div>
        </div>
        <div>
          <p className="departure route-detail-text no-padding no-margin">
            {this.props.popupData.description}
          </p>
          <p className="departure route-detail-text no-padding no-margin">
            {this.props.popupData.fluencyText}
          </p>
        </div>
      </Card>
    );
    this.setState({ popupContent: newObj });
  }

  render() {
    if (!isBrowser) { return false; }

    if (this.state.popupContent === null) {
      return (<Card className="padding-small">{this.props.loading()}</Card>);
    }

    return (<div>{this.state.popupContent}</div>);
  }
}
