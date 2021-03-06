import Relay from 'react-relay';
import StopCardHeader from './StopCardHeader';

export default Relay.createContainer(StopCardHeader, {
  fragments: {
    stop: () => Relay.QL`
      fragment on Stop {
        gtfsId
        name
        code
        desc
      }
    `,
  },
});
