/* eslint-disable id-match, id-short, id-length, no-undef */
import { assign } from 'lodash';
import promisescript from 'promisescript';

function loadOmniture() {
  return promisescript({
    //url: '//cdn.static-economist.com/sites/default/files/external/ec_omniture/3_5/ec_omniture_s_code.js',
    url: '//umbobabo.github.io/react-i13n-omniture/assets/omniture_h254.min.js',
    type: 'script',
  });
}

export default {
  name: 'omniture',
  eventHandlers: {
    pageview(payload, callback) {
      this.setOmnitureInitialProps(payload.omnitureInitialProps);
      this.tracking(payload.omnitureProps);

    },
    click(payload, callback) {
      const i13nNode = payload.i13nNode;
      // Get the props from the node
      if (i13nNode) {
        const nodeProps = i13nNode.getMergedModel();
        this.tracking(nodeProps.omnitureProps);
      } else {
        return callback();
      }
    },
  },
  tracking(trackedProps) {
    // It works only clientside
    if (typeof window !== 'undefined'){
      // Script has been already downloaded, we can send tracking metrics.
      if (this.scriptLoaded) {
        this.sendTracking(trackedProps);
      } else {
        // First call, be sure to download the omniture code.
        this.initTracking(trackedProps);
      }
    }
  },
  initTracking(trackedProps) {
    let self = this;
    // Use an internal cache to store multiples events that can happens before
    // the script is loaded.
    self.pendingRequests.push(trackedProps);
    loadOmniture().then(function() {
      self.scriptLoaded = true;
      // Send all the pending request.
      self.pendingRequests.map((request) => {
        self.sendTracking(request);
      });
      // Clear the cache.
      self.pendingRequests = [];
    }).catch(function(e) {
      console.error('An error loading or executing Omniture has occured: ', e.message);
    });
  },
  sendTracking(trackedProps) {
    console.log(trackedProps);
    if (window.s_gi) {
      window.s = window.s_gi((process.env.NODE_ENV === 'production') ? 'economistcomprod' : 'economistcomdev');
      // Instead of using InitialProps we could freeze the immutable properties
      // that we want prevent to change.
      window.s = assign(window.s, this.omnitureInitialProps, trackedProps);
      console.log('window.s', window.s);
      const omnitureTrackingCode = window.s.t();
      if (omnitureTrackingCode) {
        console.log('Writing Omniture code');
        document.write(omnitureTrackingCode);
      }
    }
  },
  scriptLoaded: false,
  pendingRequests: [],
  setOmnitureInitialProps(defaultProps) {
    this.omnitureInitialProps = defaultProps;
  },
};
