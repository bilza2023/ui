<script>
    // @ts-nocheck
    import NavBtn from './NavBtn.svelte';
    import NavBtn2 from './NavBtn2.svelte';
    import Logo from './Logo.svelte';
    import {checkLogin} from '../config/index';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    
  let userName = "guest";  
  onMount(async()=>{
    const email = await checkLogin();
  if(email !== null){
    userName = email;
  }
  });

function logout(){
  localStorage.removeItem('token');
  goto('/login'); // or home, or wherever you want
}
   

    </script>
                <!-- ******************************** -->
    <!-- decided not to use NavBar comp -->
    <div class='flex justify-between items-center p-3 px-6 m-0 bg-[#c4a77f] shadow-sm'>
  
        <div class='flex'>
        
            <Logo
            url="/"
            bg="bg-[#c4a77f]"
            hoverBg="hover:bg-[#bc9661]"
            titleColor="text-gray-900"
          />
          
        </div>
                <!-- ******************************** -->
                <!-- ******************************** -->
        <div class='flex'>
      
          <NavBtn
          title="AI"
          icon="🧠 "
          url="/courses/ai"
          bgColor="bg-[#d6b88d]"
          titleColor="text-gray-900"
        />

        <NavBtn
        title="IT"
        icon="🧰"
        url="/courses/it"
        bgColor="bg-[#d6b88d]"
        titleColor="text-gray-900"
      />

      <NavBtn
      title="9 Physics"
      icon="🇵🇰"
      url="/courses/fbise9physics"
      bgColor="bg-[#d6b88d]"
      titleColor="text-gray-900"
    />

    
        <!-- <NavBtn title='Payment' icon = '🚀' url='/payment'/> -->
        <NavBtn
        title="Contact"
        icon="📱"
        url="/contact"
        bgColor="bg-[#d6b88d]"
        titleColor="text-gray-900"
      />
        <NavBtn
        title="Blog"
        icon="📘"
        url="/blog"
        bgColor="bg-[#d6b88d]"
        titleColor="text-gray-900"
      />
      
       
        <!-- <NavBtn title='Payment' icon = '🚀' url='/payment'/> -->
         {#if userName == "guest"}
         <NavBtn title="register" icon ='🔓'  url='/register'/>
         {:else}
         <NavBtn2 title="logout" icon ='🔑'  clk={logout}  /> 
         <NavBtn title={userName} icon ='👨‍🎓'  url='#'/> 
         {/if}
        <!-- <NavBtn title='Signup' icon ='🔓'  url='/signup'/> -->
        </div>
    </div><!--outer most div-->
    
    