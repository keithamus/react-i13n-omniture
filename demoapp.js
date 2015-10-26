/* eslint-disable id-match */
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactI13n = require('react-i13n');

var loggedin = 'logged_in';
var today = new Date().toString();
var I13nAnchor = _reactI13n.createI13nNode('a', {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true
});
// Simulation of a basic App.

var DemoApp = (function (_React$Component) {
  _inherits(DemoApp, _React$Component);

  function DemoApp() {
    _classCallCheck(this, DemoApp);

    _React$Component.apply(this, arguments);
  }

  DemoApp.prototype.componentWillMount = function componentWillMount() {
    this.props.i13n.executeEvent('pageview', {
      omnitureProps: {
        pageName: 'the_world_if|blogs|DemocracyInAmerica',
        server: 'economist.com',
        channel: 'home',
        prop1: 'the_world_if',
        prop3: 'web',
        prop4: 'blogs',
        prop5: 'home',
        prop11: loggedin,
        prop13: 'anonymous',
        prop31: today
      }
    });
  };

  DemoApp.prototype.render = function render() {
    return _react2['default'].createElement(
      I13nAnchor,
      {
        href: '#',
        i13nModel: { action: 'click', omnitureProps: {
            pageName: 'the_world_if|blogs|DemocracyInAmerica',
            server: 'economist.com',
            channel: 'home',
            prop1: 'the_world_if',
            prop3: 'web',
            prop4: 'blogs',
            prop5: 'home',
            prop11: loggedin,
            prop13: 'anonymous',
            prop31: today
          } }
      },
      'This is a link'
    );
  };

  _createClass(DemoApp, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        i13n: _react2['default'].PropTypes.object
      };
    }
  }]);

  return DemoApp;
})(_react2['default'].Component);

exports['default'] = DemoApp;
module.exports = exports['default'];