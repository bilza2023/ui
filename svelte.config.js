import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-static';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * port 3000 is for taleem website
 * port 4000 is for admin app
 * port 5000 is API (sqlite) 
 * 
*/

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'build', precompress: false, env: { host: '0.0.0.0', port: 3000 } })
	},
preprocess: vitePreprocess()	
};

export default config;
