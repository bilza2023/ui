<!-- File: src/routes/admin/syllabus/+page.svelte -->
<script>
    export let data;
    const { tcodes, chapters, exercises } = data;
  </script>
  
  <svelte:head>
    <title>Admin Syllabus</title>
  </svelte:head>
  
  <div class="min-h-screen bg-gray-900 text-gray-100 p-8">
    <h1 class="mb-8 text-4xl font-bold">Admin Syllabus</h1>
  
    <div class="space-y-10">
      <!-- Add Tcode Section -->
      <section class="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <h2 class="mb-4 text-2xl font-semibold">Add Tcode</h2>
        <form method="POST" class="grid gap-4 md:grid-cols-2">
          <input type="hidden" name="action" value="createTcode" />
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Tcode Name</span>
            <input
              name="tcodeName"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Title</span>
            <input
              name="title"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label class="flex flex-col md:col-span-2">
            <span class="mb-1 font-medium">Description</span>
            <textarea
              name="description"
              rows="3"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Image URL</span>
            <input
              name="image"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <div class="md:col-span-2 text-right">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Add Tcode
            </button>
          </div>
        </form>
      </section>
  
      <!-- Add Chapter Section -->
      <section class="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <h2 class="mb-4 text-2xl font-semibold">Add Chapter</h2>
        <form method="POST" class="grid gap-4 md:grid-cols-2">
          <input type="hidden" name="action" value="createChapter" />
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Filename</span>
            <input
              name="filename"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Name</span>
            <input
              name="name"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label class="flex flex-col md:col-span-2">
            <span class="mb-1 font-medium">Description</span>
            <textarea
              name="description"
              rows="3"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Image URL</span>
            <input
              name="image"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Order</span>
            <input
              type="number"
              name="order"
              value="0"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>
          <label class="flex flex-col md:col-span-2">
            <span class="mb-1 font-medium">Tcode</span>
            <select
              name="tcodeId"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" class="bg-gray-800 text-gray-100">-- Select Tcode --</option>
              {#each tcodes as t}
                <option
                  value={t.id}
                  class="bg-gray-800 text-gray-100"
                >
                  {t.title}
                </option>
              {/each}
            </select>
          </label>
          <div class="md:col-span-2 text-right">
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Add Chapter
            </button>
          </div>
        </form>
      </section>
  
      <!-- Add Exercise Section -->
      <section class="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <h2 class="mb-4 text-2xl font-semibold">Add Exercise</h2>
        <form method="POST" class="grid gap-4 md:grid-cols-2">
          <input type="hidden" name="action" value="createExercise" />
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Filename</span>
            <input
              name="filename"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Name</span>
            <input
              name="name"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
          <label class="flex flex-col md:col-span-2">
            <span class="mb-1 font-medium">Description</span>
            <textarea
              name="description"
              rows="3"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Image URL</span>
            <input
              name="image"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
          <label class="flex flex-col">
            <span class="mb-1 font-medium">Order</span>
            <input
              type="number"
              name="order"
              value="0"
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>
          <label class="flex flex-col md:col-span-2">
            <span class="mb-1 font-medium">Chapter</span>
            <select
              name="chapterId"
              required
              class="p-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" class="bg-gray-800 text-gray-100">-- Select Chapter --</option>
              {#each chapters as c}
                <option
                  value={c.id}
                  class="bg-gray-800 text-gray-100"
                >
                  {c.name}
                </option>
              {/each}
            </select>
          </label>
          <div class="md:col-span-2 text-right">
            <button
              type="submit"
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
            >
              Add Exercise
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
  
  <style>
    /* Dark mode responsive grid */
    form.grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      form.grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
  