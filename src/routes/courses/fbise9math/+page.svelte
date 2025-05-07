<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  const course = {
    title: "Math Class 9 FBISE",
    description: "This course introduces students to the world of Artificial Intelligence. You’ll explore basic concepts, practical tools, and real-world applications — all tailored for learners in Pakistan. No prior coding experience required. Just curiosity and the will to learn.",
    thumbnail: "/brand/ai4.webp"
  };
</script>

  <Nav />
<!-- Brochure-style Hero Layout with Dark Band -->
<section class="w-full bg-[#3d2e1e]/90">
  <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center gap-8">

    <!-- Left: Image -->
    <div class="w-full md:w-2/5 flex justify-center items-center">
      <img
        src={course.thumbnail}
        alt="Course Thumbnail"
        class="max-h-[300px] w-auto object-contain rounded-md border border-[#c4a77f] shadow-md"
      />
    </div>

    <!-- Right: Text -->
    <div class="w-full md:w-3/5 flex flex-col justify-center space-y-4 text-white">
      <h2 class="text-3xl font-extrabold border-b-2 border-[#c4a77f] pb-2">
        {course.title}
      </h2>

      <p class="text-base leading-relaxed tracking-wide">
        {course.description}
      </p>

      <div class="text-sm italic">
        📘 This course is part of the <strong>Taleem.Help</strong> learning collection.
      </div>
    </div>

  </div>
</section>


<!-- Course Info Section -->
<!-- Course Info Section -->
<section class="w-full bg-[#dbc6ab] py-12">
  <div class="max-w-xl mx-auto">

    <!-- Title -->
    <h3 class="text-2xl font-semibold text-[#3d2e1e] mb-4 text-center tracking-tight">
      📋 Course Details
    </h3>

    <!-- Table Box -->
    <div class="bg-[#f3e8d9] border border-[#c4a77f] rounded-xl shadow-[0_8px_24px_-2px_#c4a77f] hover:shadow-[0_12px_36px_-4px_#c4a77f] transition-shadow duration-300">
      <table class="w-full text-left text-sm text-gray-800 rounded-xl overflow-hidden">
        <tbody>
          <tr class="border-b border-[#c4a77f]">
            <td class="p-4 font-semibold w-1/2">Course Duration</td>
            <td class="p-4">15 Days</td>
          </tr>
          <tr class="border-b border-[#c4a77f]">
            <td class="p-4 font-semibold">Level</td>
            <td class="p-4">Beginner</td>
          </tr>
          <tr class="border-b border-[#c4a77f]">
            <td class="p-4 font-semibold">Language</td>
            <td class="p-4">English + Urdu</td>
          </tr>
          <tr class="border-b border-[#c4a77f]">
            <td class="p-4 font-semibold">Delivery</td>
            <td class="p-4">Online + Self-Paced</td>
          </tr>
          <tr>
            <td class="p-4 font-semibold">Includes</td>
            <td class="p-4 leading-relaxed">
              ✔️ High-quality video lectures<br/>
              ✔️ Assignments after every module<br/>
              ✔️ End-of-course quiz with instant feedback<br/>
              ✔️ Downloadable learning resources<br/>
              ✔️ Certificate of Completion
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</section>
