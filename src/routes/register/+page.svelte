<script>
  import { goto } from '$app/navigation';
    import {API_URL} from "../../lib/config/index"

let email = "";
  let password = "";
  let password2 = "";

  async function register() {
    // debugger;
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      goto('/login'); // 👈 Redirect after login
      // alert("Registered! Token saved.");
      localStorage.setItem('token', data.token);
    } else {
      alert("Error: " + (data.error || 'Something went wrong'));
    }
  }
</script>

<div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
  <h1 class="text-4xl font-extrabold mb-4">Welcome to <a href="https://taleem.help" class="text-blue-400 underline">Taleem.help</a></h1>

  <div class="w-full max-w-xl p-10 bg-gray-800 rounded-2xl shadow-xl">
    <h2 class="text-3xl font-bold text-center mb-6">Student Registration</h2>

    <label class="text-lg">Email</label>
    <input type="email" bind:value={email} class="w-full text-lg p-3 mb-4 bg-gray-700 rounded" />

    <label class="text-lg">Password</label>
    <input type="password" bind:value={password} class="w-full text-lg p-3 mb-4 bg-gray-700 rounded" />

    <label class="text-lg">Confirm Password</label>
    <input type="password" bind:value={password2} class="w-full text-lg p-3 mb-6 bg-gray-700 rounded" />

    <button on:click={register} class="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-lg font-semibold">
      Register
    </button>
  </div>
</div>
