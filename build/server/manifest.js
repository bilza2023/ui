const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["blog/about.md","blog/ai-foundation-track-brochure.html","blog/algebra_basics/algebraIntroduction.html","blog/algebra_basics/hcf.html","blog/algebra_basics/hcf_vs_lcm.html","blog/algebra_basics/index.html","blog/algebra_basics/lcm.html","blog/algebra_basics/list.json","blog/algebra_basics/polynomials_and_their_types.html","blog/algebra_basics/prime_factorization.html","blog/algebra_basics/properties_of_rational_numbers.html","blog/algebra_basics/rational_numbers.html","blog/algebra_basics/what_is_algebra.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/class9_all_theorems_pt1.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","blog/theorem11_1_4.html","blog/why-frontend-frameworks-are-a-scam.html","bookcovers/blog.webp","bookcovers/chemistry_10thFBSIE.png","bookcovers/chemistry_9thFBSIE.png","bookcovers/fbise10math.png","bookcovers/fbise9math.png","bookcovers/fbise9mathOld.png","bookcovers/fbise9physics.png","bookcovers/math.png","bookcovers/math_10thFBSIE.png","bookcovers/math_8thFBSIE.png","bookcovers/math_9thFBSIE.png","bookcovers/physics_10thFBSIE.png","bookcovers/urdu_10thFBSIE.png","bookcovers/urdu_8thFBSIE.png","bookcovers/urdu_9thFBSIE.png","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","components/taleem-slides/taleem-slides-v-0-0-0.js","components/taleem-slides/taleem-slides.js","components/taleem-slides/taleem-slides.js.map","css/katex.min.css","css/theme.css","data/blog_index.json","data/css/blog.css","data/css/notes.css","data/global-blog.css","data/notes/fbise9mathold_theorem11_1_4.json","data/notes/fbise9mathold_theorem_11.1.4.json","data/notes/gold_standard.json","data/notes/test.json","data/syllabus/fbise9mathold.json","data/syllabus/fbise9physics.json","data/syllabus/subjects.json","data/syllabus.json","data/synopsis/fbise9mathold.json","data/videos_index.json","decks/angles_and_transversals.json","decks/congruent_triangles.json","decks/demo_deck.json","decks/eq_28aug2025.json","decks/parallelogram_properties.json","decks/parallelogram_properties_no_sound.json","decks/posultate_and_SAS_postulate.json","decks/theorem_revision_ch10_11.fixed.json","decks/theorem_revision_ch10_11.json","decks/theorems9old_11.1.1.json","decks/theorems9old_11.1.2.json","decks/theorems9old_11.1.3.json","decks_workdesk/angles_and_transversals.json","decks_workdesk/bullets.json","decks_workdesk/demo_deck.json","decks_workdesk/fbiseclass9theorems1.json","decks_workdesk/glodStandard_deck.js","decks_workdesk/glodStandard_deck.json","decks_workdesk/gold_standard_eq_sp.js","decks_workdesk/gold_standard_eq_sp.json","decks_workdesk/gold_standard_mixed_slide.js","decks_workdesk/gold_standard_mixed_slide.json","decks_workdesk/index.json","decks_workdesk/new_deck.json","decks_workdesk/theorem_revision_ch10_11.js","decks_workdesk/theorem_revision_ch10_11.json","decks_workdesk/theorems9old_11.1.3.js","decks_workdesk/theorems9old_11.1.4.js","decks_workdesk/theorems9old_11.1.5.js","decks_workdesk/water_cycle.js","notes-very-old/best-practices-dockerizing-nodejs-express-api.html","notes-very-old/docker_basics.html","notes-very-old/index.html","notes-very-old/monogodb_docker_setup.html","notes-very-old/using_mongodb_with_dockers.html","reserch/9mathold_ch10.md","reserch/9mathold_ch11.md","reserch/GPT-Reserch-assitance-instruction.md","reserch/Theorem table request.docx","reserch/Theorem table request.pdf","reserch/alrentate_correspondance_angles.md","reserch/angles_and_transversals.md","reserch/class9_all_theorems.md","reserch/congruent_triangles.md","reserch/parallegrams_and_triangles.md","reserch/pointer-idea.md","reserch/transversal.md","sites-available.txt","videoBlog/ce/taleem-slides.js","videoBlog/ce/taleem-slides.js.map","videoBlog/demo_deck.json","videoBlog/player.html"]),
	mimeTypes: {".md":"text/markdown",".html":"text/html",".json":"application/json",".png":"image/png",".css":"text/css",".webp":"image/webp",".js":"text/javascript",".map":"application/json",".pdf":"application/pdf",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BIDx7PzN.js",app:"_app/immutable/entry/app.WOu61dAp.js",imports:["_app/immutable/entry/start.BIDx7PzN.js","_app/immutable/chunks/BGduEOPq.js","_app/immutable/chunks/BEyYsYVz.js","_app/immutable/chunks/_3BmA3c0.js","_app/immutable/entry/app.WOu61dAp.js","_app/immutable/chunks/BEyYsYVz.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-dvRND9b3.js')),
			__memo(() => import('./chunks/1-D0gR2tN2.js')),
			__memo(() => import('./chunks/2-BLETzmYe.js')),
			__memo(() => import('./chunks/3-Cjp4V6g-.js')),
			__memo(() => import('./chunks/4-DL_L_tXD.js')),
			__memo(() => import('./chunks/5-B-GQXm0N.js')),
			__memo(() => import('./chunks/6-le62D86F.js')),
			__memo(() => import('./chunks/7-kMM1Jy5v.js')),
			__memo(() => import('./chunks/8-zGn9jjWc.js')),
			__memo(() => import('./chunks/9-BpCfCAJZ.js')),
			__memo(() => import('./chunks/10-CUhEJO0y.js')),
			__memo(() => import('./chunks/11-CEGN3dBa.js')),
			__memo(() => import('./chunks/12-0YcRSvlW.js')),
			__memo(() => import('./chunks/13-DLovC3MG.js')),
			__memo(() => import('./chunks/14-nGmD3bBA.js')),
			__memo(() => import('./chunks/15-BtaG5xSe.js')),
			__memo(() => import('./chunks/16-Zq4PdLEF.js')),
			__memo(() => import('./chunks/17-UsI2LTtD.js')),
			__memo(() => import('./chunks/18-DLarvkon.js')),
			__memo(() => import('./chunks/19-BLQ3c-jH.js')),
			__memo(() => import('./chunks/20-DW7tOphv.js')),
			__memo(() => import('./chunks/21-BeLIeMBu.js')),
			__memo(() => import('./chunks/22-C674lnHi.js')),
			__memo(() => import('./chunks/23-B8LJiBif.js')),
			__memo(() => import('./chunks/24-9-2chMU1.js')),
			__memo(() => import('./chunks/25-B-4vEkQL.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/comments",
				pattern: /^\/admin\/comments\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/delete",
				pattern: /^\/admin\/delete\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: __memo(() => import('./chunks/_server-CfXX6jFD.js'))
			},
			{
				id: "/admin/editor_note",
				pattern: /^\/admin\/editor_note\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: __memo(() => import('./chunks/_server-BSpnYPe0.js'))
			},
			{
				id: "/admin/editor_slide",
				pattern: /^\/admin\/editor_slide\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: __memo(() => import('./chunks/_server-BJdOuw49.js'))
			},
			{
				id: "/admin/question_editor",
				pattern: /^\/admin\/question_editor\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: __memo(() => import('./chunks/_server-Sml88-OZ.js'))
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: __memo(() => import('./chunks/_server-0ALCMTBw.js'))
			},
			{
				id: "/admin/subscriptions",
				pattern: /^\/admin\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/timings",
				pattern: /^\/admin\/timings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: __memo(() => import('./chunks/_server-BJNyKYPL.js'))
			},
			{
				id: "/admin/uploadNotes",
				pattern: /^\/admin\/uploadNotes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: __memo(() => import('./chunks/_server-B3uUewdR.js'))
			},
			{
				id: "/admin/upload_json",
				pattern: /^\/admin\/upload_json\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: __memo(() => import('./chunks/_server-9Xeh3_Iv.js'))
			},
			{
				id: "/admin/upload",
				pattern: /^\/admin\/upload\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: __memo(() => import('./chunks/_server-DttKQdpt.js'))
			},
			{
				id: "/admin/workdesk",
				pattern: /^\/admin\/workdesk\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-zpGikjxm.js'))
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D8OV9KaM.js'))
			},
			{
				id: "/api/auth/register",
				pattern: /^\/api\/auth\/register\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-7cOZ_hAM.js'))
			},
			{
				id: "/api/auth/verify",
				pattern: /^\/api\/auth\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CReb7gMJ.js'))
			},
			{
				id: "/api/comment",
				pattern: /^\/api\/comment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-ed-laHTk.js'))
			},
			{
				id: "/api/like",
				pattern: /^\/api\/like\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BnMSFcQf.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/media/[...path]",
				pattern: /^\/media(?:\/([^]*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DpomzEMW.js'))
			},
			{
				id: "/notes",
				pattern: /^\/notes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/player",
				pattern: /^\/player\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/sales",
				pattern: /^\/sales\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/studio",
				pattern: /^\/studio\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: __memo(() => import('./chunks/_server-TWiYuvEC.js'))
			},
			{
				id: "/syllabus",
				pattern: /^\/syllabus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
