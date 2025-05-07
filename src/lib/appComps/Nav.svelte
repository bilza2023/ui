<script>
    // @ts-nocheck
    import NavBtn from './NavBtn.svelte';
    import Logo from './Logo.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    // import chqLogin from "../../lib/loginFns/chqLogin";
    // import logout from "../../lib/loginFns/logout";
    
    
    let isLogin = false;
    onMount( async ()=>{
        // debugger;
        isLogin = chqLogin();
    });
    
    </script>
                <!-- ******************************** -->
    <!-- decided not to use NavBar comp -->
    <div class='flex justify-between items-center p-3 px-6 m-0 bg-[#d6b88d] shadow-sm'>
  
        <div class='flex'>
        
            <Logo
            url="/"
            bg="bg-[#d6b88d]"
            hoverBg="hover:bg-[#bfa074]"
            titleColor="text-gray-900"
          />
          
        </div>
                <!-- ******************************** -->
                <!-- ******************************** -->
        <div class='flex'>
        {#if isLogin}
    
        <!-- <NavBtn title='Payment' icon = '🚀' url='/payment'/> -->
        <NavBtn
        title="Blog"
        icon="📘"
        url="/blog"
        bgColor="bg-[#d6b88d]"
        titleColor="text-gray-900"
      />
      
      

        
        {:else}
        <NavBtn
        title="Blog"
        icon="📘"
        url="/blog"
        bgColor="bg-[#d6b88d]"
        titleColor="text-gray-900"
      />
      
        <!-- <NavBtn title='Payment' icon = '🚀' url='/payment'/> -->
        <!-- <NavBtn title='Login' icon ='🔑'  url='/login'/> -->
        <!-- <NavBtn title='Signup' icon ='🔓'  url='/signup'/> -->
        {/if}
        </div>
    </div><!--outer most div-->
    
    