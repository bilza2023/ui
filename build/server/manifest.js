const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["app/ai.jpg","app/canvas.jpeg","app/computer-course.avif","app/computer-course.png","app/edit.jpeg","app/editor2.jpeg","app/exp.jpeg","app/fbise9math.png","app/magic.jpeg","app/player.jpeg","app/presentation.jpeg","blog/about.md","blog/ai-foundation-track-brochure.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","demo_slides_data/circles.json","demo_slides_data/slide0.js","demo_slides_data/three_points_and_a_pic.js","demo_slides_data/title01.js","demo_slides_data/venn_diagram.js","demo_slides_data/venn_diagram2.js","favicon.ico","favicon.png","images/1.6q2.png","images/8.1-q2-p-1.png","images/8.1-q2-p-2.png","images/8.1-q2-p-3.png","images/8.1-q2-p-5.png","images/activity1.jpg","images/antilog1.jpg","images/antilog2.jpg","images/antilog3.jpg","images/antilog4.jpg","images/appleFallingFromTree.webp","images/atom.png","images/average speed.png","images/baloons.png","images/banners.png","images/black_board.jpg","images/board_classroom.jpg","images/car showing speed (1).png","images/car showing speed.png","images/carbon-atom.png","images/chestBox.webp","images/class.webp","images/class2.webp","images/drops.png","images/everyDayItems.webp","images/ex4.1-q2_matrix_multiplication.png","images/fbise9physicsChapter1Bg.webp","images/fbise9physicsChapter1Thumbnail.webp","images/fbise9physicsChapter3Thumbnail.webp","images/fbise9physicsChapter4Thumbnail.webp","images/fbise9physicsChapter5Thumbnail.webp","images/fbise9physicsChapter6Thumbnail.webp","images/fbise9physicsChapter7Thumbnail.webp","images/fbise9physicsChapter8Thumbnail.webp","images/fbise9physicsChapter9Thumbnail.webp","images/female_teacher.jpg","images/getImagesDbList.js","images/helium-atom.png","images/hydrongen-atom.png","images/logtable1.jpg","images/logtable2.jpg","images/logtable3.jpg","images/logtable4.jpg","images/mad_scientist.jpg","images/moving car with arrows.jpg","images/multiplication_step-0.png","images/multiplication_step-01.png","images/multiplication_step-02.png","images/multiplication_step-03.png","images/multiplication_step-04.png","images/oxygen-atom.png","images/pattern_waves.png","images/people.png","images/physicsArt.webp","images/physicsBranches.webp","images/physicsClass.webp","images/rocketTakeoff.webp","images/solarsystem.jpg","images/taleem_classroom.jpg","images/taleemclass.webp","images/tcode-banner.webp","images/teacher_facing_board.jpg","images/teen_boy.jpg","images/test.png","images/text2-4-8-6.png","images/theorem10.1.1.png","images/theorem10.1.2.png","images/typesOfForce.webp","images/whatisforce.webp","images/wood.jpg","notes/best-practices-dockerizing-nodejs-express-api.html","notes/docker_basics.html","notes/index.html","notes/monogodb_docker_setup.html","notes/using_mongodb_with_dockers.html","pivot/1920x1080.png","pivot/banner_brand.png","pivot/box.webp","pivot/ch1_physical_quantities_ch1_physical_quantities_ex1_intro_q002_branches_physics1.webp","pivot/ch1_physical_quantities_ch1_physical_quantities_ex1_intro_q002_branches_physics2.webp","pivot/defaultBg.png","pivot/fbise9physics.webp","pivot/female.png","pivot/male.png","pivot/physics_in_life.webp","pivot/physics_modern_life.webp","pivot/potrate.jpg","response.md","responsive.html","sounds/music.opus","system_images/1920x1080.png","system_images/bg.png","system_images/chemistry_10thFBSIE.png","system_images/chemistry_9thFBSIE.png","system_images/fbise10math.png","system_images/fbise9math.png","system_images/fbise9mathOld.png","system_images/female.png","system_images/female2.png","system_images/graph.png","system_images/male.png","system_images/math.png","system_images/math_10thFBSIE.png","system_images/math_8thFBSIE.png","system_images/math_9thFBSIE.png","system_images/physics_10thFBSIE.png","system_images/potrate.jpg","system_images/theorem10.1.2.png","system_images/urdu_10thFBSIE.png","system_images/urdu_8thFBSIE.png","system_images/urdu_9thFBSIE.png","tcodes/box.webp","tcodes/chapter-banner.webp","tcodes/exercise-banner.webp","tcodes/fbise10physics.webp","tcodes/fbise10physicsChapter1.webp","tcodes/fbise10physicsChapter2.webp","tcodes/fbise9math.webp","tcodes/fbise9physics.webp","tcodes/question-banner.webp","tcodes/taleem-banner.webp","thumbnails/class.jpg","thunbnails_slides/atom.png","thunbnails_slides/baloons.png","thunbnails_slides/banners.png","thunbnails_slides/carbon-atom.png","thunbnails_slides/circles.png","thunbnails_slides/drops.png","thunbnails_slides/presentationZero.png","thunbnails_slides/slide0.png","thunbnails_slides/teen_boy.jpg","thunbnails_slides/three_points_and_a_pic.png","thunbnails_slides/title01.png","thunbnails_slides/venn_diagram.png","thunbnails_slides/venn_diagram2.png","thunbnails_slides/wood.jpg"]),
	mimeTypes: {".jpg":"image/jpeg",".jpeg":"image/jpeg",".avif":"image/avif",".png":"image/png",".md":"text/markdown",".html":"text/html",".css":"text/css",".webp":"image/webp",".json":"application/json",".js":"text/javascript",".opus":"audio/ogg"},
	_: {
		client: {"start":"_app/immutable/entry/start.Bt5J2OkB.js","app":"_app/immutable/entry/app.DPRw_Oes.js","imports":["_app/immutable/entry/start.Bt5J2OkB.js","_app/immutable/chunks/entry.BbLrwdZZ.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BcZXew59.js","_app/immutable/entry/app.DPRw_Oes.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.CaW-J3HZ.js","_app/immutable/chunks/index.BAnhAC8H.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-CUqpz5GW.js')),
			__memo(() => import('./chunks/1-DTGyU2Bz.js')),
			__memo(() => import('./chunks/2-BwO9cWD7.js')),
			__memo(() => import('./chunks/3-CBWvo7SH.js')),
			__memo(() => import('./chunks/4-D__h6293.js')),
			__memo(() => import('./chunks/5-DACwL4A_.js')),
			__memo(() => import('./chunks/6-Bpc560ZK.js')),
			__memo(() => import('./chunks/7-Cde7VavQ.js')),
			__memo(() => import('./chunks/8-C-pnEDZr.js'))
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
				id: "/md",
				pattern: /^\/md\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/syllabus/fbise9physics",
				pattern: /^\/syllabus\/fbise9physics\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
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

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
