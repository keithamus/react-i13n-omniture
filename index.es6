/* eslint-disable id-match, id-short, id-length, no-undef */
import { assign } from 'lodash';

//<script
//   type="text/javascript"
//   src="https://cdn.static-economist.com/sites/default/files/external/ec_omniture/3_5/ec_omniture_s_code.js"
// ></script>


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
    console.log(trackedProps);
    if (window.s_gi) {
      window.s = window.s_gi((process.env.NODE_ENV === 'production') ? 'economistcomprod' : 'economistcomdev');
      window.s = assign(window.s, trackedProps);
      console.log(window.s);
      const omnitureTrackingCode = window.s.t();
      if (omnitureTrackingCode) {
        document.write(omnitureTrackingCode);
      }
    }
  },
};
