
# 🧭 **Consolidated Reference: Taleem Admin/UI API Usage**

---

## **$lib/services/loginServices.js**

* `isAdmin(token)`

---

## **$lib/services/syllabusService.js**

* `getTcode(id)`
* `listChapters(tcodeId)`
* `createChapter(data)`
* `getChapter(id)`
* `updateChapter(id, data)`
* `deleteChapter(id)`
* `listExercises(chapterId)`
* `getExercise(id)`
* `createExercise(data)`
* `updateExercise(id, data)`
* `deleteExercise(id)`
* `getAllTcodes()`

---

## **$lib/services/studentMessageServices.js**

* `listCommentsByStatus(status, opts)`
* `answerComment(id, response)`
* `markCommentBad(id)`
* `setCommentStatus(id, status)`

---

## **$lib/services/questionServices.js**

* `questions.list(opts)`
* `questions.getById(id)`
* `questions.create(data)`
* `questions.update(id, data)`
* `questions.delete(id)`

---

## **$lib/services/subscriptionServices.js**

* `addSubscription(userId, tcode, duration, { startDate })`

---

## **$lib/server/prisma.js**

* `prisma.user.findUnique()`
* `prisma.subscription.findMany()`

---

## **$lib/formKit/readers.js**

* `R.intId()`
* `R.str()`
* `R.num()`
* `R.int()`
* `R.$enum()`

---

## **$lib/formKit/actionFactory.js**

* `makeAction()`

---

## **$lib/function/slug.js**

* `SLUG()`

---

## **$lib/crudl/crudl.js**

* `crudl('question')` → used locally to access `questions.create()`

---

## **@sveltejs/kit**

* `redirect()`
* `error()`
* `fail()`

---

### ✅ **Total Unique Services / Utilities in Use**

**13 service modules / utility groups**
covering syllabus, questions, student messages, subscriptions, and admin auth.
