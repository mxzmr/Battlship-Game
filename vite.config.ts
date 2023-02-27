import { defineConfig } from 'vitest/config';
import babel from 'vite-plugin-babel';

const config = defineConfig({
	define: {
		'import.meta.vitest': 'undefined' 
/* makes sure it doesnt include the tests inside regular files in the bundle build */
	},
  test: {
		includeSource: ['src/**/*.{js,ts}'], // includes testing inside regular js,ts files
    coverage: {
      reporter: ['text', 'html']
    }
  },
  plugins: [
    // Babel will try to pick up Babel config files (.babelrc or .babelrc.json)
    babel(),
    // ...
],
});

// module.exports = {
//   setupFilesAfterEnv: ['./jest.setup.js']
// }
export default config;
