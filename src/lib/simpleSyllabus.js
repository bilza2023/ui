// SimpleSyllabus.js

export function SimpleSyllabus(syllabus) {
    // Validate on load (panic on any structural error)
    if (!Array.isArray(syllabus)) {
      throw new Error("Syllabus must be an array of tcodes.");
    }
  
    for (const t of syllabus) {
      if (!t.tcode || !Array.isArray(t.chapters)) {
        throw new Error(`Tcode ${t.tcode || 'MISSING'} must have 'tcode' and 'chapters'.`);
      }
      for (const ch of t.chapters) {
        if (!ch.filename || !Array.isArray(ch.exercises)) {
          throw new Error(`Chapter in ${t.tcode} must have 'filename' and 'exercises'.`);
        }
        for (const ex of ch.exercises) {
          if (!ex.filename || !Array.isArray(ex.questions)) {
            throw new Error(`Exercise in ${t.tcode}/${ch.filename} must have 'filename' and 'questions'.`);
          }
        }
      }
    }
  
    // All methods are pure reads
    return {
      getTcode(tcodeName) {
        return syllabus.find(t => t.tcode === tcodeName) || null;
      },
  
      getChapter(tcodeName, chapterFilename) {
        const t = syllabus.find(t => t.tcode === tcodeName);
        if (!t) return null;
        return t.chapters.find(ch => ch.filename === chapterFilename) || null;
      },
  
      getExercise(tcodeName, chapterFilename, exerciseFilename) {
        const ch = this.getChapter(tcodeName, chapterFilename);
        if (!ch) return null;
        return ch.exercises.find(ex => ex.filename === exerciseFilename) || null;
      },
  
      getAllChapters(tcodeName) {
        const t = syllabus.find(t => t.tcode === tcodeName);
        return t ? t.chapters : [];
      },
  
      getAllExercises(tcodeName, chapterFilename) {
        const ch = this.getChapter(tcodeName, chapterFilename);
        return ch ? ch.exercises : [];
      },
  
      getQuestions(tcodeName, chapterFilename, exerciseFilename) {
        const ex = this.getExercise(tcodeName, chapterFilename, exerciseFilename);
        return ex ? ex.questions : [];
      }
    };
  }