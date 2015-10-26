/* eslint-disable id-match, id-length */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactI13n = require('react-i13n');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _demoapp = require('./demoapp');

var _demoapp2 = _interopRequireDefault(_demoapp);

var TrackedApp = _reactI13n.setupI13n(_demoapp2['default'], {
  rootModelData: {
    omnitureProps: {
      visitorNamespace: 'economist',
      trackingServer: 'stats.economist.com',
      trackingServerSecure: 'sstats.economist.com',
      dc: '122',
      linkTrackVars: ['pageName', 'channel', 'events', 'prop1', 'prop3', 'prop4', 'prop5', 'prop11', 'prop13', 'prop14', 'prop31', 'prop34', 'prop40', 'prop41', 'prop42', 'prop46', 'contextData.subsection'].join(''),
      pageName: '',
      pageType: '',
      server: '',
      channel: '',
      contextData: {
        subsection: ''
      },
      prop1: '',
      prop2: '',
      prop3: 'web',
      prop4: '',
      prop5: '',
      prop11: '',
      prop13: '',
      prop14: '',
      prop31: '',
      prop34: '',
      prop40: '',
      prop41: '',
      prop42: '',
      prop46: '',
      linkTrackEvents: '',
      events: ''
    }
  },
  isViewportEnabled: true
}, [_index2['default']]);
exports['default'] = _react2['default'].createElement(TrackedApp, null);
module.exports = exports['default'];