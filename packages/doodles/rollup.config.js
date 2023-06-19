import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import resolve from '@rollup/plugin-node-resolve';

const config = {
  input: 'index.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    compact: true
  },
  plugins: [
    svelte({
      /* options available https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md */ 
      preprocess: autoPreprocess(),
      // You can restrict which files are compiled
      // using `include` and `exclude`
      // include: 'src/components/**/*.svelte',

      // Emit CSS as "files" for other plugins to process. default is true
      emitCss: false,

      // Warnings are normally passed straight to Rollup. You can
      // optionally handle them here, for example to squelch
      // warnings with a particular code
      // onwarn: (warning, handler) => {
      //   // e.g. don't warn on <marquee> elements, cos they're cool
      //   if (warning.code === 'a11y-distracting-elements') return;

      //   // let Rollup handle all other warnings normally
      //   handler(warning);
      // },

      // You can pass any of the Svelte compiler options
      compilerOptions: {
        // By default, the client-side compiler is used. You
        // can also use the server-side rendering compiler
        // generate: 'ssr',

        // ensure that extra attributes are added to head
        // elements for hydration (used with generate: 'ssr')
        // hydratable: true,

        // You can optionally set 'customElement' to 'true' to compile
        // your components to custom elements (aka web elements)
        customElement: true
      }
    }),
    // see NOTICE below
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte']
    }),
    // ...
  ]
}

export default config;