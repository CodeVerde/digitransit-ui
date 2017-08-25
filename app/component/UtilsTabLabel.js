import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from './Icon';

export default function UtilsTabLabel({ classes, onClick }) {
  return (
    <li className={classes} onClick={onClick}>
      <Icon
        className="prefix-icon utils-icon"
        img="icon-icon_settings_1"
      />
      <FormattedMessage id="utils" defaultMessage="Utils" />
    </li>
  );
}

UtilsTabLabel.propTypes = {
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
