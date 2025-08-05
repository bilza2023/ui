<script>
	
	import Nav from '$lib/appComps/Nav.svelte';
	
</script>

<div class="app-container">
	<Nav />
<div class="blog_container">
 
    <a class="blog_link" href="/blog/class9_all_theorems_pt1.html" >Class9 All Theorems Pt-1</a>
    
</div>
</div>

<style>
.blog_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    background-color: #C1B294;
    min-height: 100vh;
}

.blog_link {
    display: inline-block;
    background-color: #ffffff;
    color: #333333;
    font-size: larger;
    text-decoration: none;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog_link:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}



</style>