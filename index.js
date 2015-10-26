/* eslint-disable id-match, id-short, id-length, no-undef */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _promisescript = require('promisescript');

var _promisescript2 = _interopRequireDefault(_promisescript);

function loadOmniture() {
  return _promisescript2['default']({
    url: '//cdn.static-economist.com/sites/default/files/external/ec_omniture/3_5/ec_omniture_s_code.js',
    type: 'script'
  });
}

exports['default'] = {
  name: 'omniture',
  eventHandlers: {
    pageview: function pageview(payload, callback) {
      this.tracking(payload.omnitureProps);
    },
    click: function click(payload, callback) {
      var i13nNode = payload.i13nNode;
      // Get the props from the node
      if (i13nNode) {
        var nodeProps = i13nNode.getMergedModel();
        this.tracking(nodeProps.omnitureProps);
      } else {
        return callback();
      }
    }
  },
  tracking: function tracking(trackedProps) {
    // Script has been already downloaded, we can send tracking metrics.
    if (this.scriptLoaded) {
      this.sendTracking(trackedProps);
    } else {
      // First call, be sure to download the omniture code.
      this.initTracking(trackedProps);
    }
  },
  initTracking: function initTracking(trackedProps) {
    var self = this;
    // Use an internal cache to store multiples events that can happens before
    // the script is loaded.
    self.pendingRequests.push(trackedProps);
    loadOmniture().then(function () {
      self.scriptLoaded = true;
      // Send all the pending request.
      self.pendingRequests.map(function (request) {
        self.sendTracking(request);
      });
      // Clear the cache.
      self.pendingRequests = [];
    })['catch'](function (e) {
      console.error('An error loading or executing Omniture has occured: ', e.message);
    });
  },
  sendTracking: function sendTracking(trackedProps) {
    console.log('window.s', window.s);
    console.log(trackedProps);
    if (window.s_gi) {
      window.s = window.s_gi(process.env.NODE_ENV === 'production' ? 'economistcomprod' : 'economistcomdev');
      window.s = _lodash.assign(window.s, trackedProps);
      var omnitureTrackingCode = window.s.t();
      if (omnitureTrackingCode) {
        console.log('Writing Omniture code');
        document.write(omnitureTrackingCode);
      }
    }
  },
  scriptLoaded: false,
  pendingRequests: []
};
module.exports = exports['default'];