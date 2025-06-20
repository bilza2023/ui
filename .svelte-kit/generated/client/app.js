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
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/blog": [4],
		"/change_forgot_password": [5],
		"/contact": [6],
		"/content": [7],
		"/courses/ai": [8],
		"/courses/fbise9physics": [9],
		"/courses/fbise9physics/chapter1": [10],
		"/courses/it": [11],
		"/eq": [~12],
		"/forgot_password": [13],
		"/login": [14],
		"/md": [15],
		"/pivotplayer": [~16],
		"/register": [17],
		"/studio": [18],
		"/syllabus/fbise9physics": [19],
		"/v-static": [~20],
		"/videoblog": [21]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';