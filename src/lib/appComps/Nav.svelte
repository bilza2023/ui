<script>
    // @ts-nocheck
    import NavBtn from './NavBtn.svelte';
    import Logo from './Logo.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    // import chqLogin from "../../lib/loginFns/chqLogin";
    // import logout from "../../lib/loginFns/logout";
    
    
    let isLogin = false;

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
      title="FBISE"
      icon="🇵🇰"
      url="/courses/fbise"
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
        <!-- <NavBtn title='Login' icon ='🔑'  url='/login'/> -->
        <!-- <NavBtn title='Signup' icon ='🔓'  url='/signup'/> -->
        </div>
    </div><!--outer most div-->
    
    