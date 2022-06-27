import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'visual-essays',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    inlineSvg(),
    // nodePolyfills()
  ],
};
