<script>
    export let data;
  
    const headline = data.find(d => d.name === "headline")?.content ?? "";
    const email = data.find(d => d.name === "email")?.content ?? "";
    const phone = data.find(d => d.name === "phone")?.content ?? "";
  </script>
  
  <div class="slide-container">
    <h1 class="headline">{headline}</h1>
    <p class="contact-line">Email: {email}</p>
    <p class="contact-line">Phone: {phone}</p>
  </div>
  
  <style>
  .slide-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
    gap: 12px;
    padding: 40px;
    box-sizing: border-box;
  }
  
  .headline {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
  }
  
  .contact-line {
    font-size: 1.2rem;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .headline {
      font-size: 1.6rem;
    }
  
    .contact-line {
      font-size: 1rem;
    }
  }
  </style>
  