const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["ai.svg","anchor_scripts/algebra_common_identities_deck.md","anchor_scripts/algebra_equation_vs_expression.md","anchor_scripts/anchor_script.md","anchor_scripts/content-factory.md","anchor_scripts/what_is_algebra.md","blog/about.md","blog/ai-foundation-track-brochure.html","blog/algebra_basics/algebraIntroduction.html","blog/algebra_basics/hcf.html","blog/algebra_basics/hcf_vs_lcm.html","blog/algebra_basics/index.html","blog/algebra_basics/lcm.html","blog/algebra_basics/list.json","blog/algebra_basics/polynomials_and_their_types.html","blog/algebra_basics/prime_factorization.html","blog/algebra_basics/properties_of_rational_numbers.html","blog/algebra_basics/rational_numbers.html","blog/algebra_basics/what_is_algebra.html","blog/backend-servies-presentation/agile.html","blog/backend-servies-presentation/ai_consultancy.html","blog/backend-servies-presentation/basic_backend_package.html","blog/backend-servies-presentation/bpo.html","blog/backend-servies-presentation/commercial-products.html","blog/backend-servies-presentation/consultancy_product.html","blog/backend-servies-presentation/donts.html","blog/backend-servies-presentation/example_projects.html","blog/backend-servies-presentation/global_it_based_services.html","blog/backend-servies-presentation/images/it_diagram.png","blog/backend-servies-presentation/index.html","blog/backend-servies-presentation/low-level-it-services.html","blog/backend-servies-presentation/off_the_shelf_services.html","blog/backend-servies-presentation/pakistani-it-companies.html","blog/backend-servies-presentation/pakistani-it-industry-overview.html","blog/backend-servies-presentation/projects-weve-built.html","blog/backend-servies-presentation/q.md","blog/backend-servies-presentation/rad.html","blog/backend-servies-presentation/saas.html","blog/backend-servies-presentation/taleem_help_reasons.html","blog/backend-servies-presentation/understanding-software-industry.html","blog/backend-servies-presentation/zameen_example.html","blog/be-part-of-ai-revolution.html","blog/class9_all_theorems_pt1.html","blog/devops/installing_nginx.html","blog/future-in-the-ai-era-for--pakistani-students.html","blog/main.css","blog/pakistani-it-companies.html","blog/pakistani-it-industry-overview.html","blog/pk-ai-startups-report.html","blog/theorem11_1_4.html","blog/why-frontend-frameworks-are-a-scam.html","bookcovers/blog.webp","bookcovers/chemistry_10thFBSIE.png","bookcovers/chemistry_9thFBSIE.png","bookcovers/fbise10math.png","bookcovers/fbise9math.png","bookcovers/fbise9mathOld.png","bookcovers/fbise9physics.png","bookcovers/math.png","bookcovers/math_10thFBSIE.png","bookcovers/math_8thFBSIE.png","bookcovers/math_9thFBSIE.png","bookcovers/physics_10thFBSIE.png","bookcovers/urdu_10thFBSIE.png","bookcovers/urdu_8thFBSIE.png","bookcovers/urdu_9thFBSIE.png","brand/a-deaft.png","brand/add-freelancing.webp","brand/ai-home-thumbnail.webp","brand/ai.webp","brand/ai101.webp","brand/ai2.webp","brand/ai3.webp","brand/ai4.webp","brand/ai4professionals.webp","brand/ai_courses.webp","brand/ai_fundamentals.webp","brand/banner_brand_section.png","brand/brocheure.webp","brand/contact-image.webp","brand/english-fbise.webp","brand/english.webp","brand/english9th.webp","brand/english9th2.webp","brand/facebook_page_profile.webp","brand/fbise-banner.webp","brand/it.webp","brand/it2.webp","brand/it3.webp","brand/math2.webp","brand/math3.webp","brand/math_class9.webp","brand/mathclass9fbise.webp","brand/placeholder.webp","brand/taleem-banner.webp","brand/taleem-banner2.webp","brand/taleem_card.webp","brand/web-brochuer.webp","brand/web.webp","brand/website-7may2025.png","components/taleem-slides/taleem-slides-v-0-0-0.js","components/taleem-slides/taleem-slides.js","components/taleem-slides/taleem-slides.js.map","css/katex.min.css","css/theme.css","data/blog_index.json","data/css/blog.css","data/css/notes.css","data/global-blog.css","data/index_data.json","data/notes/fbise9mathold_theorem11_1_4.json","data/notes/fbise9mathold_theorem_11.1.4.json","data/notes/gold_standard.json","data/notes/test.json","data/syllabus/fbise9mathold.json","data/syllabus/fbise9physics.json","data/syllabus/subjects.json","data/syllabus.json","data/synopsis/fbise9mathold.json","decks/angles_and_transversals.json","decks/congruent_triangles.json","decks/demo_deck.json","decks/parallelogram_properties.json","decks/parallelogram_properties_no_sound.json","decks/posultate_and_SAS_postulate.json","decks/theorem_revision_ch10_11.fixed.json","decks/theorem_revision_ch10_11.json","decks/theorems9old_11.1.1.json","decks/theorems9old_11.1.2.json","decks/theorems9old_11.1.3.json","decks_workdesk/angles_and_transversals.json","decks_workdesk/bullets.json","decks_workdesk/demo_deck.json","decks_workdesk/fbiseclass9theorems1.json","decks_workdesk/glodStandard_deck.js","decks_workdesk/glodStandard_deck.json","decks_workdesk/gold_standard_eq_sp.js","decks_workdesk/gold_standard_eq_sp.json","decks_workdesk/gold_standard_mixed_slide.js","decks_workdesk/gold_standard_mixed_slide.json","decks_workdesk/index.json","decks_workdesk/new_deck.json","decks_workdesk/theorem_revision_ch10_11.js","decks_workdesk/theorem_revision_ch10_11.json","decks_workdesk/theorems9old_11.1.3.js","decks_workdesk/theorems9old_11.1.4.js","decks_workdesk/theorems9old_11.1.5.js","decks_workdesk/water_cycle.js","favicon.svg","images-old/8.1-q2-p-2.png","images-old/activity1.jpg","images-old/al-khwarizmi_book_page.webp","images-old/algebra_area_formula.png","images-old/angles.jpg","images-old/antilog1.jpg","images-old/antilog2.jpg","images-old/antilog3.jpg","images-old/antilog4.jpg","images-old/appleFallingFromTree.webp","images-old/atom.png","images-old/baloons.png","images-old/banner_brand.png","images-old/banner_brand_section.png","images-old/banners.png","images-old/beaker.webp","images-old/beakers2.webp","images-old/bg.png","images-old/black_board.jpg","images-old/board_classroom.jpg","images-old/box.webp","images-old/branches_of_physics.webp","images-old/canvas.jpeg","images-old/car showing speed (1).png","images-old/car showing speed.png","images-old/carbon-atom.png","images-old/class.webp","images-old/class2.webp","images-old/congruent_triangle.webp","images-old/congruent_triangle2.webp","images-old/defaultBg.png","images-old/drops.png","images-old/edit.jpeg","images-old/equation_balance_scale_labeled.webp","images-old/everyDayItems.webp","images-old/ex4.1-q2_matrix_multiplication.png","images-old/exp.jpeg","images-old/expression_example_labeled.webp","images-old/fbise9physicsChapter1Bg.webp","images-old/fbise9physicsChapter1Thumbnail.webp","images-old/fbise9physicsChapter3Thumbnail.webp","images-old/fbise9physicsChapter4Thumbnail.webp","images-old/fbise9physicsChapter5Thumbnail.webp","images-old/fbise9physicsChapter6Thumbnail.webp","images-old/fbise9physicsChapter7Thumbnail.webp","images-old/fbise9physicsChapter8Thumbnail.webp","images-old/fbise9physicsChapter9Thumbnail.webp","images-old/female.png","images-old/female_teacher.jpg","images-old/graph.png","images-old/helium-atom.png","images-old/hydrongen-atom.png","images-old/logtable1.jpg","images-old/logtable2.jpg","images-old/logtable3.jpg","images-old/logtable4.jpg","images-old/mad_scientist.jpg","images-old/magic.jpeg","images-old/male.png","images-old/matric_column_n_row.png","images-old/matrix_multiplication_01.png","images-old/matrix_multiplication_02.png","images-old/matrix_multiplication_03.png","images-old/matrix_multiplication_04.png","images-old/matrix_multiplication_05.png","images-old/moving car with arrows.jpg","images-old/nestedTriangles.webp","images-old/oxygen-atom.png","images-old/parallelogram_and_triangle.svg","images-old/parallelogram_properties_labeled.png","images-old/pattern_waves.png","images-old/people.png","images-old/physicsArt.webp","images-old/physicsBranches.webp","images-old/physicsClass.webp","images-old/physics_bg.webp","images-old/physics_in_life.webp","images-old/physics_modern_life.webp","images-old/player.jpeg","images-old/potrate.jpg","images-old/presentation.jpeg","images-old/pythagoras_diagram.webp","images-old/rocketTakeoff.webp","images-old/side_angle_side_postulate.webp","images-old/slide.webp","images-old/solarsystem.jpg","images-old/space.webp","images-old/student_solving_equation_blackboard.webp","images-old/taleem.svg","images-old/taleem.webp","images-old/taleem_classroom.jpg","images-old/taleemclass.webp","images-old/teacher_facing_board.jpg","images-old/teen_boy.jpg","images-old/theorem10.1.1.png","images-old/theorem9old_10_1_1.webp","images-old/theorem9old_10_1_2.webp","images-old/theorem9old_10_1_2_silhot.webp","images-old/theorems9old_10.1.1.svg","images-old/theorems9old_10.1.2.svg","images-old/theorems9old_10.1.3.svg","images-old/theorems9old_10.1.4.svg","images-old/theorems9old_11.1.1.svg","images-old/theorems9old_11.1.1_b.svg","images-old/theorems9old_11.1.1_c.svg","images-old/theorems9old_11.1.2.svg","images-old/theorems9old_11.1.3.svg","images-old/theorems9old_11.1.4.svg","images-old/theorems9old_11.1.4_01.svg","images-old/theorems9old_11.1.5.manifest.json","images-old/theorems9old_11.1.5.svg","images-old/theorems9old_11.1.5_pointer.svg","images-old/theorems9old_12.1.1.svg","images-old/theorems9old_12.1.2.svg","images-old/theorems9old_12.1.3.svg","images-old/theorems9old_12.1.4.svg","images-old/theorems9old_12.1.5.svg","images-old/theorems9old_12.1.6.svg","images-old/theorems9old_13.1.1.svg","images-old/theorems9old_13.1.2.svg","images-old/theorems9old_13.1.3.svg","images-old/theorems9old_13.1.4.svg","images-old/theorems9old_14.1.1.svg","images-old/theorems9old_14.1.2.svg","images-old/theorems9old_14.1.3.svg","images-old/theorems9old_14.1.4.svg","images-old/theorems9old_15.1.1.svg","images-old/theorems9old_15.1.2.svg","images-old/theorems9old_16.1.1.svg","images-old/theorems9old_16.1.2.svg","images-old/theorems9old_16.1.3.svg","images-old/theorems9old_16.1.4.svg","images-old/traversal.webp","images-old/typesOfForce.webp","images-old/whatisforce.webp","images-old/wide.png","images-old/wood.jpg","md/fbise9mathold_theorem11.1.4.md","md/fbise9mathold_theorem_11.1.4.html","md/styles.css","md/test.html","md/test.md","notes/best-practices-dockerizing-nodejs-express-api.html","notes/docker_basics.html","notes/index.html","notes/monogodb_docker_setup.html","notes/using_mongodb_with_dockers.html","reserch/9mathold_ch10.md","reserch/9mathold_ch11.md","reserch/GPT-Reserch-assitance-instruction.md","reserch/Theorem table request.docx","reserch/Theorem table request.pdf","reserch/alrentate_correspondance_angles.md","reserch/angles_and_transversals.md","reserch/class9_all_theorems.md","reserch/congruent_triangles.md","reserch/parallegrams_and_triangles.md","reserch/pointer-idea.md","reserch/transversal.md","sounds-old/angles_and_transversals.opus","sounds-old/congruent_triangles.opus","sounds-old/math9old_theorem10_1_3.opus","sounds-old/music.opus","sounds-old/parallelogram_properties.opus","sounds-old/postulate.mp3","sounds-old/posultate_and_SAS_postulate.opus","sounds-old/theorems9old_11.1.1.opus","sounds-old/theorems9old_11.1.2.opus","sounds-old/theorems9old_11.1.3.opus","sounds-old/what_is_algebra.opus","svg-picker/genManifest.js","svg-picker/manifest.json","svg-picker/svg-gallery.html","svg-picker/svgs/ai.svg","svg-picker/svgs/favicon.svg","svg-picker/svgs/theorems9old_10.1.1.svg","svg-picker/svgs/theorems9old_10.1.2.svg","svg-picker/svgs/theorems9old_10.1.3.svg","svg-picker/svgs/theorems9old_10.1.4.svg","svg-picker/svgs/theorems9old_11.1.1.svg","svg-picker/svgs/theorems9old_11.1.1_b.svg","svg-picker/svgs/theorems9old_11.1.1_c.svg","svg-picker/svgs/theorems9old_11.1.2.svg","svg-picker/svgs/theorems9old_11.1.3.svg","svg-picker/svgs/theorems9old_11.1.4.svg","svg-picker/svgs/theorems9old_11.1.4_01.svg","svg-picker/theorems9old_10.1.3.svg","videoBlog/ce/taleem-slides.js","videoBlog/ce/taleem-slides.js.map","videoBlog/demo_deck.json","videoBlog/player.html"]),
	mimeTypes: {".svg":"image/svg+xml",".md":"text/markdown",".html":"text/html",".json":"application/json",".png":"image/png",".css":"text/css",".webp":"image/webp",".js":"text/javascript",".map":"application/json",".jpg":"image/jpeg",".jpeg":"image/jpeg",".pdf":"application/pdf",".opus":"audio/ogg",".mp3":"audio/mpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.l6pLW-LN.js",app:"_app/immutable/entry/app.D5bHIaid.js",imports:["_app/immutable/entry/start.l6pLW-LN.js","_app/immutable/chunks/CqL6qkBr.js","_app/immutable/chunks/C5V-7dkx.js","_app/immutable/chunks/CXNmKXog.js","_app/immutable/entry/app.D5bHIaid.js","_app/immutable/chunks/C5V-7dkx.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BOhE6kA-.js')),
			__memo(() => import('./chunks/1-Dn3cXsFl.js')),
			__memo(() => import('./chunks/2-DD_3zw-t.js')),
			__memo(() => import('./chunks/3-BWydTYbI.js')),
			__memo(() => import('./chunks/4-CulRKMye.js')),
			__memo(() => import('./chunks/5-X2ozf9Gs.js')),
			__memo(() => import('./chunks/6-CXmLafSy.js')),
			__memo(() => import('./chunks/7-CkgZfIwb.js')),
			__memo(() => import('./chunks/8--AMFTOTG.js')),
			__memo(() => import('./chunks/9-Xzf6ufDl.js')),
			__memo(() => import('./chunks/10-BwpVXdRw.js')),
			__memo(() => import('./chunks/11-B2QjloIQ.js')),
			__memo(() => import('./chunks/12-CI_9bxsy.js')),
			__memo(() => import('./chunks/13-CIBO_GLj.js')),
			__memo(() => import('./chunks/14-DTag2Q5F.js')),
			__memo(() => import('./chunks/15-CWhPqykC.js')),
			__memo(() => import('./chunks/16-YSzD_LSp.js')),
			__memo(() => import('./chunks/17-D8xMnGy3.js')),
			__memo(() => import('./chunks/18-BC0C83bE.js')),
			__memo(() => import('./chunks/19-m9RS8jUe.js')),
			__memo(() => import('./chunks/20-CNDwVKL-.js')),
			__memo(() => import('./chunks/21-CnvsKYTH.js')),
			__memo(() => import('./chunks/22-VFsmiwXB.js'))
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
				id: "/admin/delete",
				pattern: /^\/admin\/delete\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: __memo(() => import('./chunks/_server-DQmdgeV1.js'))
			},
			{
				id: "/admin/editor",
				pattern: /^\/admin\/editor\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: __memo(() => import('./chunks/_server-D8VA1SJw.js'))
			},
			{
				id: "/admin/settings",
				pattern: /^\/admin\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: __memo(() => import('./chunks/_server-IlCHyN2d.js'))
			},
			{
				id: "/admin/subscriptions",
				pattern: /^\/admin\/subscriptions\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/timings",
				pattern: /^\/admin\/timings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: __memo(() => import('./chunks/_server-B22220Lw.js'))
			},
			{
				id: "/admin/uploadNotes",
				pattern: /^\/admin\/uploadNotes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: __memo(() => import('./chunks/_server-CnUYV2hD.js'))
			},
			{
				id: "/admin/upload_json",
				pattern: /^\/admin\/upload_json\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: __memo(() => import('./chunks/_server-Bpv1Qvl1.js'))
			},
			{
				id: "/admin/upload",
				pattern: /^\/admin\/upload\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: __memo(() => import('./chunks/_server-BkOijsID.js'))
			},
			{
				id: "/admin/workdesk",
				pattern: /^\/admin\/workdesk\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-ctyQOfPk.js'))
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
				endpoint: __memo(() => import('./chunks/_server-CD0a1qrr.js'))
			},
			{
				id: "/api/auth/verify",
				pattern: /^\/api\/auth\/verify\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-_wILylH1.js'))
			},
			{
				id: "/api/comment",
				pattern: /^\/api\/comment\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-y1kYCVa1.js'))
			},
			{
				id: "/api/like",
				pattern: /^\/api\/like\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BwxyCArL.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
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
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/player",
				pattern: /^\/player\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/sales",
				pattern: /^\/sales\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/studio",
				pattern: /^\/studio\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: __memo(() => import('./chunks/_server-BVBFNbtq.js'))
			},
			{
				id: "/syllabus",
				pattern: /^\/syllabus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
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
