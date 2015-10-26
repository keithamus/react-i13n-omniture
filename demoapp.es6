/* eslint-disable id-match */
import React from 'react';
import { createI13nNode } from 'react-i13n';

const loggedin = 'logged_in';
const today = new Date().toString();
const I13nAnchor = createI13nNode('a', {
  isLeafNode: true,
  bindClickEvent: true,
  follow: true,
});
// Simulation of a basic App.
export default class DemoApp extends React.Component {

  static get propTypes() {
    return {
      i13n: React.PropTypes.object,
    };
  }

  componentWillMount() {
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
        prop31: today,
      },
    });
  }

  render() {
    return (
      <I13nAnchor
        href="#"
        i13nModel={{ action: 'click', omnitureProps: {
          pageName: 'the_world_if|blogs|DemocracyInAmerica',
          server: 'economist.com',
          channel: 'home',
          prop1: 'the_world_if',
          prop3: 'web',
          prop4: 'blogs',
          prop5: 'home',
          prop11: loggedin,
          prop13: 'anonymous',
          prop31: today,
        } }}
      >This is a link</I13nAnchor>
    );
  }
}
