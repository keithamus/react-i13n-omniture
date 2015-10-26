/* eslint-disable id-match, id-short, id-length, no-undef */
import { assign } from 'lodash';
import promisescript from 'promisescript';

function loadOmniture() {
  return promisescript({
    url: '//cdn.static-economist.com/sites/default/files/external/ec_omniture/3_5/ec_omniture_s_code.js',
    type: 'script',
  });
}

export default {
  name: 'omniture',
  eventHandlers: {
    pageview(payload, callback) {
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
    // Script has been already downloaded, we can send tracking metrics.
    if (this.scriptLoaded) {
      this.sendTracking(trackedProps);
    } else {
      // First call, be sure to download the omniture code.
      this.initTracking(trackedProps);
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
    console.log('window.s', window.s);
    console.log(trackedProps);
    if (window.s_gi) {
      window.s = window.s_gi((process.env.NODE_ENV === 'production') ? 'economistcomprod' : 'economistcomdev');
      window.s = assign(window.s, trackedProps);
      const omnitureTrackingCode = window.s.t();
      if (omnitureTrackingCode) {
        console.log('Writing Omniture code');
        document.write(omnitureTrackingCode);
      }
    }
  },
  scriptLoaded: false,
  pendingRequests: [],
};
