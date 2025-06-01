
<script>
    const links = ['Home', 'AI Track', 'IT Track', 'Contact'];
  </script>
  
  <footer class="footer">
    <div class="footer-top">
      <div class="brand">Taleem.Help</div>
      <nav class="nav-links">
        {#each links as link}
    <a href="https://taleem.help" class="footer-link">{link}</a>
        {/each}
      </nav>
    </div>
  
    <div class="footer-bottom">
      <p>© 2025 Taleem.Help — Education for Every Pakistani</p>
      <p class="credits">Built with ❤️ in Islamabad</p>
    </div>
  </footer>
  
  <style>
  .footer {
    background-color: #504234;
    color: #f1e9df;
    padding: 2rem;
    font-size: 0.9rem;
  }
  
  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #c4a77f;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  
  .brand {
    font-weight: bold;
    font-size: 1.25rem;
    color: #c4a77f;
  }
  
  .nav-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .footer-link {
    color: #f1e9df;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .footer-link:hover {
    color: #c4a77f;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 0.85rem;
    opacity: 0.9;
  }
  
  .credits {
    font-style: italic;
  }
  </style>
  