/* eslint-disable id-match, id-length */
import React from 'react';
import { setupI13n } from 'react-i13n';
import ReactI13nOmniture from './index';
import DemoApp from './demoapp';
const TrackedApp = setupI13n(DemoApp, {
  rootModelData: {
    product: 'Demo App',
  },
  isViewportEnabled: true,
}, [ ReactI13nOmniture ]);
export default(<TrackedApp/>);
