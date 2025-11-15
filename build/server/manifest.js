const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["blog/about.md","blog/ai-foundation-track-brochure.html","blog/algebra_basics/algebraIntroduction.html","blog/algebra_basics/hcf.html","blog/algebra_basics/hcf_vs_lcm.html","blog/algebra_basics/index.html","blog/algebra_basics/lcm.html","blog/algebra_basics/list.json","blog/algebra_basics/polynomials_and_their_types.html","blog/algebra_basics/prime_factorization.html","blog/algebra_basics/properties_of_rational_numbers.html","blog/algebra_basics/rational_numbers.html","blog/algebra_basics/what_is_algebra.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/class9_all_theorems_pt1.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","blog/theorem11_1_4.html","blog/why-frontend-frameworks-are-a-scam.html","bookcovers/blog.webp","bookcovers/chemistry_10thFBSIE.png","bookcovers/chemistry_9thFBSIE.png","bookcovers/fbise10math.png","bookcovers/fbise9math.png","bookcovers/fbise9mathOld.png","bookcovers/fbise9physics.png","bookcovers/math.png","bookcovers/math_10thFBSIE.png","bookcovers/math_8thFBSIE.png","bookcovers/math_9thFBSIE.png","bookcovers/physics_10thFBSIE.png","bookcovers/urdu_10thFBSIE.png","bookcovers/urdu_8thFBSIE.png","bookcovers/urdu_9thFBSIE.png","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","components/taleem-slides/taleem-slides-v-0-0-0.js","components/taleem-slides/taleem-slides.js","components/taleem-slides/taleem-slides.js.map","css/fonts/KaTeX_AMS-Regular.ttf","css/fonts/KaTeX_AMS-Regular.woff","css/fonts/KaTeX_AMS-Regular.woff2","css/fonts/KaTeX_Caligraphic-Bold.ttf","css/fonts/KaTeX_Caligraphic-Bold.woff","css/fonts/KaTeX_Caligraphic-Bold.woff2","css/fonts/KaTeX_Caligraphic-Regular.ttf","css/fonts/KaTeX_Caligraphic-Regular.woff","css/fonts/KaTeX_Caligraphic-Regular.woff2","css/fonts/KaTeX_Fraktur-Bold.ttf","css/fonts/KaTeX_Fraktur-Bold.woff","css/fonts/KaTeX_Fraktur-Bold.woff2","css/fonts/KaTeX_Fraktur-Regular.ttf","css/fonts/KaTeX_Fraktur-Regular.woff","css/fonts/KaTeX_Fraktur-Regular.woff2","css/fonts/KaTeX_Main-Bold.ttf","css/fonts/KaTeX_Main-Bold.woff","css/fonts/KaTeX_Main-Bold.woff2","css/fonts/KaTeX_Main-BoldItalic.ttf","css/fonts/KaTeX_Main-BoldItalic.woff","css/fonts/KaTeX_Main-BoldItalic.woff2","css/fonts/KaTeX_Main-Italic.ttf","css/fonts/KaTeX_Main-Italic.woff","css/fonts/KaTeX_Main-Italic.woff2","css/fonts/KaTeX_Main-Regular.ttf","css/fonts/KaTeX_Main-Regular.woff","css/fonts/KaTeX_Main-Regular.woff2","css/fonts/KaTeX_Math-BoldItalic.ttf","css/fonts/KaTeX_Math-BoldItalic.woff","css/fonts/KaTeX_Math-BoldItalic.woff2","css/fonts/KaTeX_Math-Italic.ttf","css/fonts/KaTeX_Math-Italic.woff","css/fonts/KaTeX_Math-Italic.woff2","css/fonts/KaTeX_SansSerif-Bold.ttf","css/fonts/KaTeX_SansSerif-Bold.woff","css/fonts/KaTeX_SansSerif-Bold.woff2","css/fonts/KaTeX_SansSerif-Italic.ttf","css/fonts/KaTeX_SansSerif-Italic.woff","css/fonts/KaTeX_SansSerif-Italic.woff2","css/fonts/KaTeX_SansSerif-Regular.ttf","css/fonts/KaTeX_SansSerif-Regular.woff","css/fonts/KaTeX_SansSerif-Regular.woff2","css/fonts/KaTeX_Script-Regular.ttf","css/fonts/KaTeX_Script-Regular.woff","css/fonts/KaTeX_Script-Regular.woff2","css/fonts/KaTeX_Size1-Regular.ttf","css/fonts/KaTeX_Size1-Regular.woff","css/fonts/KaTeX_Size1-Regular.woff2","css/fonts/KaTeX_Size2-Regular.ttf","css/fonts/KaTeX_Size2-Regular.woff","css/fonts/KaTeX_Size2-Regular.woff2","css/fonts/KaTeX_Size3-Regular.ttf","css/fonts/KaTeX_Size3-Regular.woff","css/fonts/KaTeX_Size3-Regular.woff2","css/fonts/KaTeX_Size4-Regular.ttf","css/fonts/KaTeX_Size4-Regular.woff","css/fonts/KaTeX_Size4-Regular.woff2","css/fonts/KaTeX_Typewriter-Regular.ttf","css/fonts/KaTeX_Typewriter-Regular.woff","css/fonts/KaTeX_Typewriter-Regular.woff2","css/katex.min.css","css/theme.css","data/blog_index.json","data/css/blog.css","data/css/notes.css","data/global-blog.css","data/notes/fbise9mathold_theorem11_1_4.json","data/notes/fbise9mathold_theorem_11.1.4.json","data/notes/gold_standard.json","data/notes/test.json","data/syllabus/fbise9mathold.json","data/syllabus/fbise9physics.json","data/syllabus/subjects.json","data/syllabus.json","data/synopsis/fbise9mathold.json","data/videos_index.json","decks/angles_and_transversals.json","decks/congruent_triangles.json","decks/demo_deck.json","decks/eq_28aug2025.json","decks/goldstandar_eq_28aug25.json","decks/parallelogram_properties.json","decks/parallelogram_properties_no_sound.json","decks/posultate_and_SAS_postulate.json","decks/theorem_revision_ch10_11.fixed.json","decks/theorem_revision_ch10_11.json","decks/theorems9old_11.1.1.json","decks/theorems9old_11.1.2.json","decks/theorems9old_11.1.3.json","decks_workdesk/angles_and_transversals.json","decks_workdesk/bullets.json","decks_workdesk/demo_deck.json","decks_workdesk/fbiseclass9theorems1.json","decks_workdesk/glodStandard_deck.js","decks_workdesk/glodStandard_deck.json","decks_workdesk/gold_standard_eq_sp.js","decks_workdesk/gold_standard_eq_sp.json","decks_workdesk/gold_standard_mixed_slide.js","decks_workdesk/gold_standard_mixed_slide.json","decks_workdesk/index.json","decks_workdesk/new_deck.json","decks_workdesk/theorem_revision_ch10_11.js","decks_workdesk/theorem_revision_ch10_11.json","decks_workdesk/theorems9old_11.1.3.js","decks_workdesk/theorems9old_11.1.4.js","decks_workdesk/theorems9old_11.1.5.js","decks_workdesk/water_cycle.js","favicon.svg","notes-very-old/best-practices-dockerizing-nodejs-express-api.html","notes-very-old/docker_basics.html","notes-very-old/index.html","notes-very-old/monogodb_docker_setup.html","notes-very-old/using_mongodb_with_dockers.html","reserch/9mathold_ch10.md","reserch/9mathold_ch11.md","reserch/GPT-Reserch-assitance-instruction.md","reserch/Theorem table request.docx","reserch/Theorem table request.pdf","reserch/alrentate_correspondance_angles.md","reserch/angles_and_transversals.md","reserch/class9_all_theorems.md","reserch/congruent_triangles.md","reserch/parallegrams_and_triangles.md","reserch/pointer-idea.md","reserch/transversal.md","sites-available.txt","sounds/congruent_triangles.opus","sounds/math9old_theorem10_1_3.opus","sounds/parallelogram_properties.opus","sounds/postulate.mp3","sounds/posultate_and_SAS_postulate.opus","sounds/q13.opus","sounds/theorems9old_11.1.1.opus","sounds/theorems9old_11.1.2.opus","sounds/theorems9old_11.1.3.opus","sounds/what_is_algebra.opus","videoBlog/ce/taleem-slides.js","videoBlog/ce/taleem-slides.js.map","videoBlog/demo_deck.json","videoBlog/player.html"]),
	mimeTypes: {".md":"text/markdown",".html":"text/html",".json":"application/json",".png":"image/png",".css":"text/css",".webp":"image/webp",".js":"text/javascript",".map":"application/json",".ttf":"font/ttf",".woff":"font/woff",".woff2":"font/woff2",".svg":"image/svg+xml",".pdf":"application/pdf",".txt":"text/plain",".opus":"audio/ogg",".mp3":"audio/mpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.Cb_d4hng.js",app:"_app/immutable/entry/app.Enm0Qi5A.js",imports:["_app/immutable/entry/start.Cb_d4hng.js","_app/immutable/chunks/Dks8AbzD.js","_app/immutable/chunks/CfhpnG8l.js","_app/immutable/chunks/CJcd3lYU.js","_app/immutable/chunks/CMQlxhq3.js","_app/immutable/chunks/WRvcoxuz.js","_app/immutable/entry/app.Enm0Qi5A.js","_app/immutable/chunks/CJcd3lYU.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CfhpnG8l.js","_app/immutable/chunks/jjKri7s3.js","_app/immutable/chunks/BnnCnQI7.js","_app/immutable/chunks/CdjckMN_.js","_app/immutable/chunks/Ccw9JHsH.js","_app/immutable/chunks/BRiT37BQ.js","_app/immutable/chunks/WRvcoxuz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BglrKSrT.js')),
			__memo(() => import('./chunks/1-Dh-_4I72.js')),
			__memo(() => import('./chunks/2-DV5JHHU1.js')),
			__memo(() => import('./chunks/3-s1a4ZATR.js')),
			__memo(() => import('./chunks/4-CBRXnKw-.js')),
			__memo(() => import('./chunks/5-BfrGp57X.js')),
			__memo(() => import('./chunks/6-BEG--Zfa.js')),
			__memo(() => import('./chunks/7-DHhIQ8xW.js')),
			__memo(() => import('./chunks/8-lnfl1GmZ.js')),
			__memo(() => import('./chunks/9-Bpx-jUjS.js')),
			__memo(() => import('./chunks/10-CTzUokIX.js')),
			__memo(() => import('./chunks/11-CBYuqJYe.js')),
			__memo(() => import('./chunks/12-CpNGRSIQ.js')),
			__memo(() => import('./chunks/13-Bqd9dMzf.js')),
			__memo(() => import('./chunks/14-n-yv7eLj.js')),
			__memo(() => import('./chunks/15-BVaSrnVX.js')),
			__memo(() => import('./chunks/16-A5zKoHF7.js')),
			__memo(() => import('./chunks/17-OiArMUdq.js')),
			__memo(() => import('./chunks/18-CZqBJbWw.js')),
			__memo(() => import('./chunks/19-D-RrE4bb.js')),
			__memo(() => import('./chunks/20-Bb4IMOdB.js')),
			__memo(() => import('./chunks/21-5cETOyyx.js')),
			__memo(() => import('./chunks/22-CrMNfTIZ.js')),
			__memo(() => import('./chunks/23-hzUGaDRc.js')),
			__memo(() => import('./chunks/24-CzU7cBCo.js')),
			__memo(() => import('./chunks/25-zWzIPN1-.js')),
			__memo(() => import('./chunks/26-Bv-_kVv0.js')),
			__memo(() => import('./chunks/27-xCI0V05E.js')),
			__memo(() => import('./chunks/28-CVPv8Z6P.js')),
			__memo(() => import('./chunks/29-CCe2KVEe.js'))
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
				id: "/admin/chapters",
				pattern: /^\/admin\/chapters\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/chapters/create",
				pattern: /^\/admin\/chapters\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/chapters/edit",
				pattern: /^\/admin\/chapters\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/comments",
				pattern: /^\/admin\/comments\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/exercises",
				pattern: /^\/admin\/exercises\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/exercises/create",
				pattern: /^\/admin\/exercises\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/exercises/edit",
				pattern: /^\/admin\/exercises\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/questions",
				pattern: /^\/admin\/questions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/questions/create",
				pattern: /^\/admin\/questions\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/questions/edit",
				pattern: /^\/admin\/questions\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/tcodes",
				pattern: /^\/admin\/tcodes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/tcodes/create",
				pattern: /^\/admin\/tcodes\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/tcodes/edit",
				pattern: /^\/admin\/tcodes\/edit\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admin/timings",
				pattern: /^\/admin\/timings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: __memo(() => import('./chunks/_server-CDCqyXOk.js'))
			},
			{
				id: "/admin/workdesk",
				pattern: /^\/admin\/workdesk\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-C6xulmxO.js'))
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
				endpoint: __memo(() => import('./chunks/_server-cXnm65y7.js'))
			},
			{
				id: "/api/auth/verify",
				pattern: /^\/api\/auth\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DP82LVMr.js'))
			},
			{
				id: "/api/comment",
				pattern: /^\/api\/comment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-B5qRX_et.js'))
			},
			{
				id: "/api/hifz",
				pattern: /^\/api\/hifz\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CgMpB8-5.js'))
			},
			{
				id: "/api/like",
				pattern: /^\/api\/like\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DmOGwpv7.js'))
			},
			{
				id: "/hifz",
				pattern: /^\/hifz\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
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
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/player",
				pattern: /^\/player\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/quran",
				pattern: /^\/quran\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/sales",
				pattern: /^\/sales\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/studio",
				pattern: /^\/studio\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: __memo(() => import('./chunks/_server-TWiYuvEC.js'))
			},
			{
				id: "/syllabus",
				pattern: /^\/syllabus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
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
