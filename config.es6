/* eslint-disable id-match, id-length */
export default {
  initialProps: {
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
  // Set the URL of the Omniture script you want to use.
  externalScript: '//umbobabo.github.io/react-i13n-omniture/assets/omniture_h254.min.js',
  eventHandlers: {
    click: (nodeProps) => {
      // Just a fake manipulation
      return {
        prop13: nodeProps.product,
        prop3: nodeProps.element,
      };
    },
  },
};
