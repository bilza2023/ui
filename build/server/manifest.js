const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["ai.svg","anchor_scripts/algebra_common_identities_deck.md","anchor_scripts/algebra_equation_vs_expression.md","anchor_scripts/anchor_script.md","anchor_scripts/content-factory.md","anchor_scripts/what_is_algebra.md","blog/about.md","blog/ai-foundation-track-brochure.html","blog/algebra_basics/algebraIntroduction.html","blog/algebra_basics/hcf.html","blog/algebra_basics/hcf_vs_lcm.html","blog/algebra_basics/index.html","blog/algebra_basics/lcm.html","blog/algebra_basics/list.json","blog/algebra_basics/polynomials_and_their_types.html","blog/algebra_basics/prime_factorization.html","blog/algebra_basics/properties_of_rational_numbers.html","blog/algebra_basics/rational_numbers.html","blog/algebra_basics/what_is_algebra.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/class9_all_theorems_pt1.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","blog/theorem11_1_4.html","blog/why-frontend-frameworks-are-a-scam.html","bookcovers/chemistry_10thFBSIE.png","bookcovers/chemistry_9thFBSIE.png","bookcovers/fbise10math.png","bookcovers/fbise9math.png","bookcovers/fbise9mathOld.png","bookcovers/math.png","bookcovers/math_10thFBSIE.png","bookcovers/math_8thFBSIE.png","bookcovers/math_9thFBSIE.png","bookcovers/physics_10thFBSIE.png","bookcovers/urdu_10thFBSIE.png","bookcovers/urdu_8thFBSIE.png","bookcovers/urdu_9thFBSIE.png","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","data/css/blog.css","data/css/notes.css","data/global-blog.css","data/notes/fbise9mathold_theorem11_1_4.json","data/notes/fbise9mathold_theorem_11.1.4.json","data/notes/gold_standard.json","data/notes/test.json","data/syllabus.json","decks/angles_and_transversals.json","decks/congruent_triangles.json","decks/parallelogram_properties.json","decks/posultate_and_SAS_postulate.json","decks/theorems9old_11.1.1.json","decks/theorems9old_11.1.2.json","decks/theorems9old_11.1.3.json","decks_js/README_deck_only.md","decks_js/angles_and_transversals.js","decks_js/math9old_theorem10_1_3.js","decks_js/parallellogram.js","decks_js/parallelogram_and_trangle.js","decks_js/parallelogram_properties.js","decks_js/test.js","decks_js/theorems9old_11.1.1.js","decks_js/theorems9old_11.1.2.js","favicon.png","images/8.1-q2-p-2.png","images/activity1.jpg","images/al-khwarizmi_book_page.webp","images/algebra_area_formula.png","images/angles.jpg","images/antilog1.jpg","images/antilog2.jpg","images/antilog3.jpg","images/antilog4.jpg","images/appleFallingFromTree.webp","images/atom.png","images/baloons.png","images/banner_brand.png","images/banners.png","images/beaker.webp","images/beakers2.webp","images/bg.png","images/black_board.jpg","images/board_classroom.jpg","images/box.webp","images/branches_of_physics.webp","images/canvas.jpeg","images/car showing speed (1).png","images/car showing speed.png","images/carbon-atom.png","images/class.webp","images/class2.webp","images/congruent_triangle.webp","images/congruent_triangle2.webp","images/defaultBg.png","images/drops.png","images/edit.jpeg","images/equation_balance_scale_labeled.webp","images/everyDayItems.webp","images/ex4.1-q2_matrix_multiplication.png","images/exp.jpeg","images/expression_example_labeled.webp","images/fbise9physicsChapter1Bg.webp","images/fbise9physicsChapter1Thumbnail.webp","images/fbise9physicsChapter3Thumbnail.webp","images/fbise9physicsChapter4Thumbnail.webp","images/fbise9physicsChapter5Thumbnail.webp","images/fbise9physicsChapter6Thumbnail.webp","images/fbise9physicsChapter7Thumbnail.webp","images/fbise9physicsChapter8Thumbnail.webp","images/fbise9physicsChapter9Thumbnail.webp","images/female.png","images/female_teacher.jpg","images/graph.png","images/helium-atom.png","images/hydrongen-atom.png","images/logtable1.jpg","images/logtable2.jpg","images/logtable3.jpg","images/logtable4.jpg","images/mad_scientist.jpg","images/magic.jpeg","images/male.png","images/matric_column_n_row.png","images/matrix_multiplication_01.png","images/matrix_multiplication_02.png","images/matrix_multiplication_03.png","images/matrix_multiplication_04.png","images/matrix_multiplication_05.png","images/moving car with arrows.jpg","images/nestedTriangles.webp","images/oxygen-atom.png","images/parallelogram_and_triangle.svg","images/parallelogram_properties_labeled.png","images/pattern_waves.png","images/people.png","images/physicsArt.webp","images/physicsBranches.webp","images/physicsClass.webp","images/physics_bg.webp","images/physics_in_life.webp","images/physics_modern_life.webp","images/player.jpeg","images/potrate.jpg","images/presentation.jpeg","images/pythagoras_diagram.webp","images/rocketTakeoff.webp","images/side_angle_side_postulate.webp","images/slide.webp","images/solarsystem.jpg","images/space.webp","images/student_solving_equation_blackboard.webp","images/taleem.webp","images/taleem_classroom.jpg","images/taleemclass.webp","images/teacher_facing_board.jpg","images/teen_boy.jpg","images/theorem10.1.1.png","images/theorem9old_10_1_1.webp","images/theorem9old_10_1_2.webp","images/theorem9old_10_1_2_silhot.webp","images/theorems9old_10.1.1.svg","images/theorems9old_10.1.2.svg","images/theorems9old_10.1.3.svg","images/theorems9old_10.1.4.svg","images/theorems9old_11.1.1.svg","images/theorems9old_11.1.1_b.svg","images/theorems9old_11.1.1_c.svg","images/theorems9old_11.1.2.svg","images/theorems9old_11.1.3.svg","images/theorems9old_11.1.4.svg","images/theorems9old_11.1.4_01.svg","images/theorems9old_11.1.5.manifest.json","images/theorems9old_11.1.5.svg","images/theorems9old_12.1.1.svg","images/theorems9old_12.1.2.svg","images/theorems9old_12.1.3.svg","images/theorems9old_12.1.4.svg","images/theorems9old_12.1.5.svg","images/theorems9old_12.1.6.svg","images/traversal.webp","images/typesOfForce.webp","images/whatisforce.webp","images/wide.png","images/wood.jpg","md/fbise9mathold_theorem11.1.4.md","md/fbise9mathold_theorem_11.1.4.html","md/styles.css","md/test.html","md/test.md","notes/best-practices-dockerizing-nodejs-express-api.html","notes/docker_basics.html","notes/index.html","notes/monogodb_docker_setup.html","notes/using_mongodb_with_dockers.html","reserch/9mathold_ch10.md","reserch/9mathold_ch11.md","reserch/GPT-Reserch-assitance-instruction.md","reserch/Theorem table request.docx","reserch/Theorem table request.pdf","reserch/alrentate_correspondance_angles.md","reserch/angles_and_transversals.md","reserch/class9_all_theorems.md","reserch/congruent_triangles.md","reserch/parallegrams_and_triangles.md","reserch/pointer-idea.md","reserch/transversal.md","sounds/angles_and_transversals.opus","sounds/congruent_triangles.opus","sounds/math9old_theorem10_1_3.opus","sounds/music.opus","sounds/parallelogram_properties.opus","sounds/postulate.mp3","sounds/posultate_and_SAS_postulate.opus","sounds/theorems9old_11.1.1.opus","sounds/theorems9old_11.1.2.opus","sounds/theorems9old_11.1.3.opus","sounds/what_is_algebra.opus"]),
	mimeTypes: {".svg":"image/svg+xml",".md":"text/markdown",".html":"text/html",".json":"application/json",".png":"image/png",".css":"text/css",".webp":"image/webp",".js":"text/javascript",".jpg":"image/jpeg",".jpeg":"image/jpeg",".pdf":"application/pdf",".opus":"audio/ogg",".mp3":"audio/mpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BxLSmcNc.js",app:"_app/immutable/entry/app.CLc29Nvq.js",imports:["_app/immutable/entry/start.BxLSmcNc.js","_app/immutable/chunks/DDQTwwza.js","_app/immutable/chunks/CpLwJuMr.js","_app/immutable/chunks/wFfGPoZZ.js","_app/immutable/chunks/CbY67HMy.js","_app/immutable/entry/app.CLc29Nvq.js","_app/immutable/chunks/CpLwJuMr.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BKXlM-Wo.js')),
			__memo(() => import('./chunks/1-CM9tziTY.js')),
			__memo(() => import('./chunks/2-B0qnyYM4.js')),
			__memo(() => import('./chunks/3-BMjh4_HW.js')),
			__memo(() => import('./chunks/4-97hjknZs.js')),
			__memo(() => import('./chunks/5-DUoAcDW-.js')),
			__memo(() => import('./chunks/6-SuOXkb_p.js')),
			__memo(() => import('./chunks/7-C5OCP4eD.js')),
			__memo(() => import('./chunks/8-DKoVggSV.js')),
			__memo(() => import('./chunks/9-DamYMYjG.js')),
			__memo(() => import('./chunks/10-CUe51N-q.js')),
			__memo(() => import('./chunks/11-xg4PbSYT.js')),
			__memo(() => import('./chunks/12-DNja6A8u.js')),
			__memo(() => import('./chunks/13-ChSkcQrj.js')),
			__memo(() => import('./chunks/14-C1LPGD47.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/delete",
				pattern: /^\/admin\/delete\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: __memo(() => import('./chunks/_server-KXAIPZHP.js'))
			},
			{
				id: "/admin/editor",
				pattern: /^\/admin\/editor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: __memo(() => import('./chunks/_server-BXyXqbvr.js'))
			},
			{
				id: "/admin/timings",
				pattern: /^\/admin\/timings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: __memo(() => import('./chunks/_server-hwgHLMt4.js'))
			},
			{
				id: "/admin/upload",
				pattern: /^\/admin\/upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: __memo(() => import('./chunks/_server-DrK3FLef.js'))
			},
			{
				id: "/admin/work_desk",
				pattern: /^\/admin\/work_desk\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/notes/fbise9mathold_theorem11_1_4",
				pattern: /^\/notes\/fbise9mathold_theorem11_1_4\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/notes/fbise9mathold_theorem11_1_5",
				pattern: /^\/notes\/fbise9mathold_theorem11_1_5\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/player",
				pattern: /^\/player\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/subject",
				pattern: /^\/subject\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/syllabus",
				pattern: /^\/syllabus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
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
