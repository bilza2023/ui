export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/admin": [4],
		"/blog": [5],
		"/canvas_slides_index": [7],
		"/canvas_slides": [6],
		"/contact": [8],
		"/courses/ai": [9],
		"/courses/fbise9math": [10],
		"/courses/webdevelopment": [11],
		"/editor": [12],
		"/player": [13],
		"/slides": [14],
		"/static_canvas_player": [15],
		"/static_player": [16],
		"/syllabus": [17],
		"/template-editor": [18]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';