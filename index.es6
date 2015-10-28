/* eslint-disable id-match, id-short, id-length, no-undef */
import { assign } from 'lodash';
import promisescript from 'promisescript';
// Customisation of the script to keep the plugin reusable.
import config from './config';

export default {
  name: 'omniture',
  eventHandlers: {
    /* eslint-disable no-unused-vars */
    pageview(payload, callback) {
      // We can manipulate props here.
      const nodeProps = payload.i13nNode.getMergedModel();
      // Then send the manipulated data to Omniture.
      nodeProps.action = 'pageview';
      nodeProps.page = payload.page;
      this.tracking(nodeProps);
    },
    click(payload, callback) {
      // Get the props from the node
      if (payload.i13nNode) {
        let nodeProps = payload.i13nNode.getMergedModel();
        // We can manipulate props here using functions customised in the config
        // file.
        console.log('Pre-manipulated parameters', nodeProps);
        if(config.eventHandlers.click){
          nodeProps = config.eventHandlers.click(nodeProps);
        }
        // Then send to Omniture
        this.tracking(nodeProps);
      } else {
        return callback();
      }
    },
  },
  tracking(trackedProps) {
    // Currently it works only clientside.
    // I don't see any reason to use server-side at the moment.
    if (typeof window !== 'undefined') {
      if (this.scriptLoaded) {
        // Script has been already downloaded, we can send tracking metrics.
        this.sendTracking(trackedProps);
      } else {
        // First call, be sure to download the omniture code.
        this.initTracking(trackedProps);
      }
    }
  },
  initTracking(trackedProps) {
    const self = this;
    // Use an internal cache to store multiples events that can happens before
    // the script is loaded.
    self.pendingRequests.push(trackedProps);
    // Async load of the necessary script.
    self.loadExternalScript().then(() => {
      self.scriptLoaded = true;
      // Send all the pending request.
      self.pendingRequests.map((request) => {
        self.sendTracking(request);
      });
      // Clear the cache.
      self.pendingRequests = [];
    }).catch((e) => {
      console.error('An error loading or executing Omniture has occured: ', e.message);
    });
  },
  loadExternalScript() {
    // Currently using a pure version of the Omniture script, without logic.
    return promisescript({
      url: config.externalScript,
      type: 'script',
    });
  },
  sendTracking(trackedProps) {
    console.log('SendTracking received', trackedProps);
    if (window.s_gi) {
      window.s = window.s_gi((process.env.NODE_ENV === 'production') ? 'economistcomprod' : 'economistcomdev');
      // Instead of using InitialProps we could freeze the immutable properties
      // that we want prevent to change.
      window.s = assign(window.s, config.initialProps, trackedProps);
      let omnitureTrackingCode = null;
      if (trackedProps.action === 'pageview') {
        console.log('Tracking pageview');
        omnitureTrackingCode = window.s.t();
      } else {
        console.log('Tracking link');
        // s.tl() will receive some arguments TBD.
        omnitureTrackingCode = window.s.tl();
      }
      if (omnitureTrackingCode) {
        document.write(omnitureTrackingCode);
      }
    }
  },
  scriptLoaded: false,
  pendingRequests: [],
};
