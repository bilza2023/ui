

I am more inclined towards using chapter and exercise ids rather than slug since even if we have slug we will need the chapter name , description so we still need ids to get data from syllabus services. 

so in the back end we apply strick FK relation ship between Question table and SyllabusChapter and SyllabusExercise AND also syllabus tcode (no cascading deletes )
and same in the front end --- no schema drift nothing---

i think this is canonical --- no competition for slug vs id IT IS "id" slug is just a data field that you can read

we may run a small check to see if some question contain chapter and exercises that the syllabus services does not have ???
we can still show these chapters and exercises  --or what to do ??? suggest
lets get the concept correct first
