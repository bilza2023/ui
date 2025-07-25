const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["blog/about.md","blog/ai-foundation-track-brochure.html","blog/algebra_basics/algebraIntroduction.html","blog/algebra_basics/hcf.html","blog/algebra_basics/hcf_vs_lcm.html","blog/algebra_basics/index.html","blog/algebra_basics/lcm.html","blog/algebra_basics/list.json","blog/algebra_basics/polynomials_and_their_types.html","blog/algebra_basics/prime_factorization.html","blog/algebra_basics/properties_of_rational_numbers.html","blog/algebra_basics/rational_numbers.html","blog/algebra_basics/what_is_algebra.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","blog/why-frontend-frameworks-are-a-scam.html","bookcovers/chemistry_10thFBSIE.png","bookcovers/chemistry_9thFBSIE.png","bookcovers/fbise10math.png","bookcovers/fbise9math.png","bookcovers/fbise9mathOld.png","bookcovers/math.png","bookcovers/math_10thFBSIE.png","bookcovers/math_8thFBSIE.png","bookcovers/math_9thFBSIE.png","bookcovers/physics_10thFBSIE.png","bookcovers/urdu_10thFBSIE.png","bookcovers/urdu_8thFBSIE.png","bookcovers/urdu_9thFBSIE.png","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","data/content/algebra_common_identities_deck.json","data/content/algebra_equation_vs_expression.json","data/content/deck404.json","data/content/fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra.json","data/content/test__test_chapter__test_ex__test_question.json","data/content/test__test_chapter__test_ex__test_question2.json","data/content/what_is_algebra.json","data/syllabus.json","decks/posultate_and_SAS_postulate.json","decks/theorem_10_1_1_deck.json","decks/theorem_10_1_2.json","decks/theorem_10_1_3.json","favicon.png","images/8.1-q2-p-1.png","images/8.1-q2-p-2.png","images/activity1.jpg","images/al-khwarizmi_book_page.webp","images/algebra_area_formula.png","images/antilog1.jpg","images/antilog2.jpg","images/antilog3.jpg","images/antilog4.jpg","images/appleFallingFromTree.webp","images/atom.png","images/baloons.png","images/banner_brand.png","images/banners.png","images/bg.png","images/black_board.jpg","images/board_classroom.jpg","images/box.webp","images/branches_of_physics.webp","images/canvas.jpeg","images/car showing speed (1).png","images/car showing speed.png","images/carbon-atom.png","images/class.webp","images/class2.webp","images/defaultBg.png","images/drops.png","images/edit.jpeg","images/equation_balance_scale_labeled.webp","images/everyDayItems.webp","images/ex4.1-q2_matrix_multiplication.png","images/exp.jpeg","images/expression_example_labeled.webp","images/fbise9physicsChapter1Bg.webp","images/fbise9physicsChapter1Thumbnail.webp","images/fbise9physicsChapter3Thumbnail.webp","images/fbise9physicsChapter4Thumbnail.webp","images/fbise9physicsChapter5Thumbnail.webp","images/fbise9physicsChapter6Thumbnail.webp","images/fbise9physicsChapter7Thumbnail.webp","images/fbise9physicsChapter8Thumbnail.webp","images/fbise9physicsChapter9Thumbnail.webp","images/female.png","images/female_teacher.jpg","images/graph.png","images/helium-atom.png","images/hydrongen-atom.png","images/logtable1.jpg","images/logtable2.jpg","images/logtable3.jpg","images/logtable4.jpg","images/mad_scientist.jpg","images/magic.jpeg","images/male.png","images/matric_column_n_row.png","images/matrix_multiplication_01.png","images/matrix_multiplication_02.png","images/matrix_multiplication_03.png","images/matrix_multiplication_04.png","images/matrix_multiplication_05.png","images/moving car with arrows.jpg","images/oxygen-atom.png","images/pattern_waves.png","images/people.png","images/physicsArt.webp","images/physicsBranches.webp","images/physicsClass.webp","images/physics_bg.webp","images/physics_in_life.webp","images/physics_modern_life.webp","images/player.jpeg","images/potrate.jpg","images/presentation.jpeg","images/pythagoras_diagram.webp","images/rocketTakeoff.webp","images/side_angle_side_postulate.webp","images/solarsystem.jpg","images/student_solving_equation_blackboard.webp","images/taleem.webp","images/taleem_classroom.jpg","images/taleemclass.webp","images/teacher_facing_board.jpg","images/teen_boy.jpg","images/theorem10.1.1.png","images/theorem9old_10_1_1.webp","images/theorem9old_10_1_2.webp","images/theorem9old_10_1_2_silhot.webp","images/theorems9old_10.1.3.svg","images/typesOfForce.webp","images/whatisforce.webp","images/wood.jpg","notes/best-practices-dockerizing-nodejs-express-api.html","notes/docker_basics.html","notes/index.html","notes/monogodb_docker_setup.html","notes/using_mongodb_with_dockers.html","sounds/deck404.opus","sounds/music.opus","sounds/postulate.mp3","sounds/posultate_and_SAS_postulate.opus","sounds/test__test_chapter__test_ex__test_question.opus","sounds/test__test_chapter__test_ex__test_question2.opus","sounds/theorem_10_1_3.opus","sounds/what_is_algebra.opus","svg/drawing.svg","svg/theorems9old_10.1.3.svg"]),
	mimeTypes: {".md":"text/markdown",".html":"text/html",".json":"application/json",".png":"image/png",".css":"text/css",".webp":"image/webp",".jpg":"image/jpeg",".jpeg":"image/jpeg",".svg":"image/svg+xml",".opus":"audio/ogg",".mp3":"audio/mpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.BZtuLA_X.js",app:"_app/immutable/entry/app.CYdTWl4Z.js",imports:["_app/immutable/entry/start.BZtuLA_X.js","_app/immutable/chunks/D1Z8yXs9.js","_app/immutable/chunks/DDeVi4Lk.js","_app/immutable/chunks/VQ_FC-za.js","_app/immutable/chunks/BLtivtm7.js","_app/immutable/entry/app.CYdTWl4Z.js","_app/immutable/chunks/DDeVi4Lk.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CQaZG1dd.js')),
			__memo(() => import('./chunks/1-BB903KVw.js')),
			__memo(() => import('./chunks/2-B-LYa1Iw.js')),
			__memo(() => import('./chunks/3-BJ9xDQyr.js')),
			__memo(() => import('./chunks/4-Dd3U5kdv.js')),
			__memo(() => import('./chunks/5-DnPfnw4B.js')),
			__memo(() => import('./chunks/6-cSJoPeKC.js')),
			__memo(() => import('./chunks/7-DUlt1JZj.js')),
			__memo(() => import('./chunks/8-BeatHqeF.js')),
			__memo(() => import('./chunks/9-CcODS7wx.js'))
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
				endpoint: __memo(() => import('./chunks/_server-BLTXJTTf.js'))
			},
			{
				id: "/admin/timings",
				pattern: /^\/admin\/timings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: __memo(() => import('./chunks/_server-DPKQjDDG.js'))
			},
			{
				id: "/admin/upload_deckbuilder",
				pattern: /^\/admin\/upload_deckbuilder\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: __memo(() => import('./chunks/_server-BGcyWtuO.js'))
			},
			{
				id: "/admin/upload",
				pattern: /^\/admin\/upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: __memo(() => import('./chunks/_server-DHCSfstq.js'))
			},
			{
				id: "/player",
				pattern: /^\/player\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/syllabus",
				pattern: /^\/syllabus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
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
