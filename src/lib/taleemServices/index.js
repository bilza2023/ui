// Canonical facade — import once, use everywhere as `svc`.
// Usage: import { taleemServices as svc } from '../taleemServices';

import {
    register, login, verify, isAdmin
  } from '../services/loginServices.js';
  
  import {
    getSubjectsIndex, getSyllabusByTcode, getAllSyllabusLegacy
  } from '../services/syllabusServicer.js';
  
  import {
    listCommentsByStatus, answerComment, setCommentStatus, markCommentBad,
    getUserMessages, bulkUpload as messagesBulkUpload
  } from '../services/studentMessageServices.js';
  
  
  import {
    isSubscribed as subsIsSubscribed, addSubscription
  } from '../services/subscriptionServices.js';
  
  import {
    createSoundPlayer, detectSoundUrl, createDetectedSoundPlayer, headOk
  } from '../services/soundServices.js';
  
  import {
    getSetting, setSetting, deleteSetting, listSettings,
    getIndexData, setIndexData
  } from '../services/AppServices.js';
  
  import {
    checkPassword, assertPasswordOrThrow
  } from '../services/passwordPolicy.js';
  
  import {
    exists, getQuestionByFilename, createQuestion, upsertQuestion,
    updateDeckJson, updateNoteHtml, patchQuestionMeta, deleteByFilename,
    updateNoteString
  } from '../services/questionServices.js';
  
  export const taleemServices = {
    // Auth & identity
    auth: {
      register,
      login,
      verify,
      isAdmin
    },
  
    // Syllabus navigation (subjects → chapters → exercises)
    syllabus: {
      getSubjectsIndex,
      getSyllabusByTcode,
      getAllSyllabusLegacy
    },
  
    // Q&A (comments table, teacher responses)
    messages: {
      listByStatus: listCommentsByStatus,
      answer:       answerComment,
      setStatus:    setCommentStatus,
      markBad:      markCommentBad,
    
      list:       getUserMessages,
      bulkUpload: messagesBulkUpload
    },
  
    // Questions store (deck | note records)
    questions: {
      exists,
      getByFilename: getQuestionByFilename,
      create:        createQuestion,
      upsert:        upsertQuestion,
      updateDeck:    updateDeckJson,
      updateNote:    updateNoteHtml,
      updateNoteString,                // raw setter (kept for completeness)
      patchMeta:     patchQuestionMeta,
      delete:        deleteByFilename
    },
  
    // Subscriptions & access control
    subscriptions: {
      isSubscribed: subsIsSubscribed,  // (tcode, token)
      add:          addSubscription
    },
  
    // Audio helpers for Player
    sounds: {
      createPlayer:          createSoundPlayer,
      detectUrl:             detectSoundUrl,
      createDetectedPlayer:  createDetectedSoundPlayer,
      headOk
    },
  
    // App settings (key/value JSON)
    settings: {
      get:          getSetting,
      set:          setSetting,
      delete:       deleteSetting,
      list:         listSettings,
      getIndexData,
      setIndexData
    },
  
    // Password policy
    password: {
      check:          checkPassword,
      assertOrThrow:  assertPasswordOrThrow
    }
  };
  
  export default taleemServices;
  