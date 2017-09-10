import React from 'react';
import PropTypes from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';

import isEmpty from 'lodash/isEmpty';
import AddPopupData from '../action/popupActions';


const closePopup = executeAction => (
  (event) => {
    event.stopPropagation();
    executeAction(
      AddPopupData,
      {},
    );
  }
);

const MobilePopupContainer = ({ popupData }, { executeAction, breakpoint }) => {
  if (isEmpty(popupData) || breakpoint === 'large') {
    return (<div />);
  }

  return (
    <div className="mobile-popup-container" onClick={closePopup(executeAction)}>
      <div className="mobile-popup-content" id="mobile-popup-content">
        {popupData}
      </div>
    </div>
  );
};

MobilePopupContainer.propTypes = {
  popupData: PropTypes.object.isRequired,
};

MobilePopupContainer.contextTypes = {
  // intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired,
  breakpoint: PropTypes.string.isRequired,
};

export default connectToStores(MobilePopupContainer, ['PopupStore'], context => ({
  popupData: context.getStore('PopupStore').getData(),
}));

// export default MobilePopupContainer;


// JEJEJD dedafdf dfsf sdf fsdfgsdg fsdgasg a fg afga gasfgf kghasgh
//  fgsfdglsjdfgjlsfdk jgg sdfgsfg fdg aga sfg dsg sfg sfg
//   sfgf gfdg fgfsdgfdg sdgfd
//    sdgf fjkhhjdgs gs  sgdf
//    llhhj hjk kj ku gkgjh h  jh hghjghjghj gj ghj ghjgj
//    JEJEJD dedafdf dfsf sdf fsdfgsdg fsdgasg a fg afga gasfgf kghasgh
//     fgsfdglsjdfgjlsfdk jgg sdfgsfg fdg aga sfg dsg sfg sfg
//      sfgf gfdg fgfsdgfdg sdgfd
//       sdgf fjkhhjdgs gs  sgdf
//       llhhj hjk kj ku gkgjh h  jh hghjghjghj gj ghj ghjgj
//
// JEJEJD dedafdf dfsf sdf fsdfgsdg fsdgasg a fg afga gasfgf kghasgh
//  fgsfdglsjdfgjlsfdk jgg sdfgsfg fdg aga sfg dsg sfg sfg
//   sfgf gfdg fgfsdgfdg sdgfd
//    sdgf fjkhhjdgs gs  sgdf
//    llhhj hjk kj ku gkgjh h  jh hghjghjghj gj ghj ghjgj
//    JEJEJD dedafdf dfsf sdf fsdfgsdg fsdgasg a fg afga gasfgf kghasgh
//     fgsfdglsjdfgjlsfdk jgg sdfgsfg fdg aga sfg dsg sfg sfg
//      sfgf gfdg fgfsdgfdg sdgfd
//       sdgf fjkhhjdgs gs  sgdf
//       llhhj hjk kj ku gkgjh h  jh hghjghjghj gj ghj ghjgj
