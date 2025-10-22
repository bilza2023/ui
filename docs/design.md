

21-oct-2025
===========

1: the app is compeltely dynamic (DB based)  now no fils based system that was a big big big mistake. Just download the DB backup and incase of crash restore that to the app.

2: All the tcodes and questions (without data) is downloaded and later will be saved in localstorage


3: Eachquestion has these fields that connect it to the syllabus. Previously the questions were totally automic --but we added these 3 fields for ease. if we add more app related fields the code will be bad. discuss 

  tcodeId    Int
  chapterId  Int
  exerciseId Int

4: same as above for these fields 

  ////////////////////////////////////////
  homeCategory HomeCategory? // or String?
  homeSort     Int            @default(0)
  homePinned   Boolean        @default(false)
  ////////////////////////////////////////
  