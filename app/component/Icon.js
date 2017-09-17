import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

function Icon(props) {
  if (props.clickAction) {
    return (
      <span aria-hidden onClick={props.clickAction}>
        <svg id={props.id} viewBox={props.viewBox} className={cx('icon', props.className)}>
          <use xlinkHref={`#${props.img}`} />
        </svg>
      </span>
    );
  }

  return (
    <span aria-hidden>
      <svg id={props.id} viewBox={props.viewBox} className={cx('icon', props.className)}>
        <use xlinkHref={`#${props.img}`} />
      </svg>
    </span>
  );
}

Icon.propTypes = {
  id: PropTypes.string,
  viewBox: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired,
  clickAction: PropTypes.func,
};

Icon.defaultProps = {
  viewBox: '0 0 40 40',
};

Icon.asString = (img, className, id) => `
  <span>
    <svg${id ? ` id=${id}` : ''} viewBox="0 0 40 40" class="${cx('icon', className)}">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${img}"/>
    </svg>
  </span>
`;

Icon.displayName = 'Icon';
Icon.description = 'Shows an icon from the SVG sprite';
export default Icon;
