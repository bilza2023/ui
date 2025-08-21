import Title from './Title.svelte';
import P     from './P.svelte';
import Math  from './Math.svelte';
import Code  from './Code.svelte';
import Table from './Table.svelte';
import Image from './Image.svelte'; // optional direct use

export const componentMap = {
  title:  Title,
  p:      P,
  math:   Math,
  code:   Code,
  table:  Table,
  image:  Image  // still mapped if someone renders it manually
};
