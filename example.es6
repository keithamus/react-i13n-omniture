/* eslint-disable id-match, id-length */
import React from 'react';
import { setupI13n } from 'react-i13n';
import ReactI13nOmniture from './index';
import DemoApp from './demoapp';
const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    omnitureInitialProps: {
      visitorNamespace: 'economist',
      trackingServer: 'stats.economist.com',
      trackingServerSecure: 'sstats.economist.com',
      dc: '122',
      linkTrackVars: [
        'pageName',
        'channel',
        'events',
        'prop1',
        'prop3',
        'prop4',
        'prop5',
        'prop11',
        'prop13',
        'prop14',
        'prop31',
        'prop34',
        'prop40',
        'prop41',
        'prop42',
        'prop46',
        'contextData.subsection',
      ].join(''),
      pageName: '',
      pageType: '',
      server: '',
      channel: '',
      contextData: {
        subsection: '',
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
      events: '',
    },
  },
  isViewportEnabled: true,
}, [ ReactI13nOmniture ]);
export default(<TrackedApp/>);
