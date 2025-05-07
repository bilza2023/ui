<script>
  import Nav from "../../../lib/appComps/Nav.svelte";
  import CallToAction from "../CallToAction.svelte";
  const course = {
    title: "Web Development 101",
    description: "This course introduces students to the world of web development with a strong focus on AI integration. You'll learn essential coding skills, modern tools, and practical workflows — all designed for learners in Pakistan. No prior experience needed. Just curiosity and the will to grow in IT..",
    
    thumbnail: "/brand/web.webp"
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
   <!-- Table Box -->
<div class="bg-[#f3e8d9] border border-[#c4a77f] rounded-xl shadow-[0_8px_24px_-2px_#c4a77f] hover:shadow-[0_12px_36px_-4px_#c4a77f] transition-shadow duration-300">
  <table class="w-full text-left text-sm text-gray-800 rounded-xl overflow-hidden">
    <tbody>
      <tr class="border-b border-[#c4a77f]">
        <td class="p-4 font-semibold w-1/2">Course Duration</td>
        <td class="p-4">15 Days (3 Weeks)</td>
      </tr>
      <tr class="border-b border-[#c4a77f]">
        <td class="p-4 font-semibold">Level</td>
        <td class="p-4">Beginner to Intermediate</td>
      </tr>
      <tr class="border-b border-[#c4a77f]">
        <td class="p-4 font-semibold">Language</td>
        <td class="p-4">English + Urdu (Dual Language)</td>
      </tr>
      <tr class="border-b border-[#c4a77f]">
        <td class="p-4 font-semibold">Delivery</td>
        <td class="p-4">Lectures + Lab</td>
      </tr>
      <tr>
        <td class="p-4 font-semibold">Who It's For</td>
        <td class="p-4 leading-relaxed">
          • Students curious about IT and web<br/>
          • Beginners with no coding experience<br/>
          • Freelancers looking to boost web skills<br/>
          • Teachers & professionals exploring AI<br/>
          • Anyone aiming to build modern websites
        </td>
      </tr>
    </tbody>
  </table>
</div>

</section>



<section class="w-full bg-white py-12 px-6">
  <div class="max-w-3xl mx-auto text-center space-y-5 text-[#3d2e1e]">
    <h3 class="text-2xl font-bold">🚀 Why This Course Stands Out</h3>
    <p class="text-base leading-relaxed">
      Unlike traditional web development courses, this program blends core coding skills with modern AI-powered tools. You won’t just learn HTML, CSS, and JavaScript — you'll also explore how AI like ChatGPT, GitHub Copilot, and no-code automation are shaping the future of development.
    </p>
    <p class="text-base leading-relaxed">
      From practical labs to real-world projects, everything is crafted to reflect the new digital era — faster workflows, smarter coding, and future-proof skills.
    </p>
  </div>
</section>



<CallToAction />