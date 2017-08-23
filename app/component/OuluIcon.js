import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';


const OuluIcon = ({
  className, id, img, children,
  desaturate = false, scrollIntoView = false, iconText = false,
}) => (
  <span>
    <div>
      {iconText && `${iconText}`}
    </div>
    <svg
      id={id}
      viewBox="0 0 50 50"
      className={cx('icon', className)}
      ref={el => scrollIntoView && el && el.scrollIntoView()}
    >
      <use
        filter={desaturate && 'url(#desaturate)'} xlinkHref={`#${img}`}
      />
      {children}
    </svg>
  </span>
);

/** Leaflet needs html as string */
export const asString = (props) => {
  const element = window.document.createElement('div');
  ReactDOM.render(<OuluIcon {...props} />, element);
  const html = element.innerHTML;
  ReactDOM.unmountComponentAtNode(element);
  return html;
};

OuluIcon.displayName = 'OuluIcon';

OuluIcon.description = () =>
  <div>
    <p>Shows an icon from the SVG sprite and adds blue &lsquo;tail&rsquo;.</p>
    <ComponentUsageExample description="Rotate 0">
      <OuluIcon img="icon-icon_bus-live" rotate={0} />
    </ComponentUsageExample>
    <ComponentUsageExample description="Rotate 90">
      <OuluIcon img="icon-icon_bus-live" rotate={90} />
    </ComponentUsageExample>
    <ComponentUsageExample description="Rotate 90, desaturated">
      <OuluIcon desaturate img="icon-icon_bus-live" rotate={90} />
    </ComponentUsageExample>
    <ComponentUsageExample description="no tail">
      <OuluIcon desaturate img="icon-icon_bus-live" />
    </ComponentUsageExample>
  </div>;

OuluIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired,
  rotate: PropTypes.number,
  children: PropTypes.element,
  desaturate: PropTypes.bool,
  scrollIntoView: PropTypes.bool,
  iconText: PropTypes.string,
};

export default OuluIcon;
