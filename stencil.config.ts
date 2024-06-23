import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'reusable-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    // {
    //   type: 'www',
    //   serviceWorker: null
    // },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
