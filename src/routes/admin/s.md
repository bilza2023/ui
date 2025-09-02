
- AppServices.getSetting       (DB → settings table)
- synopisisServices2.listTcodes (DB → tcodes table)

/api/tcodes
- synopisisServices2.listTcodes

/api/tcodes/[tcodeSlug]
- synopisisServices2.getNested

/api/tcodes/[tcodeSlug]/questions
- questionServices.listQuestionsByTcode


- fetch(`/api/tcodes/[tcodeSlug]`)
    → synopisisServices2.getNested   (via API)
- fetch(`/api/tcodes/[tcodeSlug]/questions`)
    → questionServices.listQuestionsByTcode   (via API)
