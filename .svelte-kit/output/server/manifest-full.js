export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["blog/about.md","blog/ai-foundation-track-brochure.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","favicon.png","images/1.6q2.png","images/1920x1080.png","images/8.1-q2-p-1.png","images/8.1-q2-p-2.png","images/8.1-q2-p-3.png","images/8.1-q2-p-5.png","images/activity1.jpg","images/ai.jpg","images/antilog1.jpg","images/antilog2.jpg","images/antilog3.jpg","images/antilog4.jpg","images/appleFallingFromTree.webp","images/atom.png","images/average speed.png","images/baloons.png","images/banner_brand.png","images/banners.png","images/bg.png","images/black_board.jpg","images/board_classroom.jpg","images/box.webp","images/canvas.jpeg","images/car showing speed (1).png","images/car showing speed.png","images/carbon-atom.png","images/ch1_physical_quantities_ch1_physical_quantities_ex1_intro_q002_branches_physics1.webp","images/ch1_physical_quantities_ch1_physical_quantities_ex1_intro_q002_branches_physics2.webp","images/chemistry_10thFBSIE.png","images/chemistry_9thFBSIE.png","images/chestBox.webp","images/class.webp","images/class2.webp","images/computer-course.avif","images/computer-course.png","images/defaultBg.png","images/drops.png","images/edit.jpeg","images/editor2.jpeg","images/everyDayItems.webp","images/ex4.1-q2_matrix_multiplication.png","images/exp.jpeg","images/fbise10math.png","images/fbise9math.png","images/fbise9mathOld.png","images/fbise9physics.webp","images/fbise9physicsChapter1Bg.webp","images/fbise9physicsChapter1Thumbnail.webp","images/fbise9physicsChapter3Thumbnail.webp","images/fbise9physicsChapter4Thumbnail.webp","images/fbise9physicsChapter5Thumbnail.webp","images/fbise9physicsChapter6Thumbnail.webp","images/fbise9physicsChapter7Thumbnail.webp","images/fbise9physicsChapter8Thumbnail.webp","images/fbise9physicsChapter9Thumbnail.webp","images/female.png","images/female2.png","images/female_teacher.jpg","images/getImagesDbList.js","images/graph.png","images/helium-atom.png","images/hydrongen-atom.png","images/logtable1.jpg","images/logtable2.jpg","images/logtable3.jpg","images/logtable4.jpg","images/mad_scientist.jpg","images/magic.jpeg","images/male.png","images/math.png","images/math_10thFBSIE.png","images/math_8thFBSIE.png","images/math_9thFBSIE.png","images/moving car with arrows.jpg","images/multiplication_step-0.png","images/multiplication_step-01.png","images/multiplication_step-02.png","images/multiplication_step-03.png","images/multiplication_step-04.png","images/oxygen-atom.png","images/pattern_waves.png","images/people.png","images/physicsArt.webp","images/physicsBranches.webp","images/physicsClass.webp","images/physics_10thFBSIE.png","images/physics_in_life.webp","images/physics_modern_life.webp","images/player.jpeg","images/potrate.jpg","images/presentation.jpeg","images/rocketTakeoff.webp","images/solarsystem.jpg","images/taleem_classroom.jpg","images/taleemclass.webp","images/tcode-banner.webp","images/teacher_facing_board.jpg","images/teen_boy.jpg","images/test.png","images/text2-4-8-6.png","images/theorem10.1.1.png","images/theorem10.1.2.png","images/typesOfForce.webp","images/urdu_10thFBSIE.png","images/urdu_8thFBSIE.png","images/urdu_9thFBSIE.png","images/whatisforce.webp","images/wood.jpg","notes/best-practices-dockerizing-nodejs-express-api.html","notes/docker_basics.html","notes/index.html","notes/monogodb_docker_setup.html","notes/using_mongodb_with_dockers.html","response.md","responsive.html","sounds/fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra.opus","sounds/music.opus","sounds/test__test_chapter__test_ex__test_question.opus","sounds/test__test_chapter__test_ex__test_question2.opus","tcodes/box.webp","tcodes/chapter-banner.webp","tcodes/exercise-banner.webp","tcodes/fbise10physics.webp","tcodes/fbise10physicsChapter1.webp","tcodes/fbise10physicsChapter2.webp","tcodes/fbise9math.webp","tcodes/fbise9physics.webp","tcodes/question-banner.webp","tcodes/taleem-banner.webp","thumbnails/class.jpg"]),
	mimeTypes: {".md":"text/markdown",".html":"text/html",".png":"image/png",".css":"text/css",".webp":"image/webp",".jpg":"image/jpeg",".jpeg":"image/jpeg",".avif":"image/avif",".js":"text/javascript",".opus":"audio/ogg"},
	_: {
		client: {"start":"_app/immutable/entry/start.B2jX1h8q.js","app":"_app/immutable/entry/app.yaClRV8_.js","imports":["_app/immutable/entry/start.B2jX1h8q.js","_app/immutable/chunks/entry.DEf28gJi.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/entry/app.yaClRV8_.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.CJqlTs1C.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
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
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/content",
				pattern: /^\/content\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/editor",
				pattern: /^\/editor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/md",
				pattern: /^\/md\/?$/,
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
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
