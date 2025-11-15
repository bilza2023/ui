// Canonical facade — import once, use everywhere as `svc`.
// Usage: import { taleemServices as svc } from '../taleemServices';

import {
    register, login, verify, isAdmin
  } from '../services/loginServices.js';
  
  
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
  
  // import {
  //   exists, getQuestionByFilename, createQuestion, upsertQuestion,
  //   updateDeckJson, updateNoteHtml, patchQuestionMeta, deleteByFilename,
  //   updateNoteString
  // } from '../services/questionServices.js';
  

  export const taleemServices = {
    // Auth & identity
    auth: {
      register,
      login,
      verify,
      isAdmin
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
  