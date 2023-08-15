'use client';
import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='flex flex-row w-full justify-center items-center bg-emerald-700 gap-1 flex-wrap pt-[48px] pb-[3px] max-w-6xl'>
      <Button variant='text' size='small'
        sx={{textTransform: 'none', backgroundColor: pathname==='/'?'#059669':'#047857', color: '#ffffff'}} 
        onClick={()=>router.push("/")}>Home</Button>
      <Button variant='text' size='small'
        sx={{textTransform: 'none', backgroundColor: pathname.indexOf('/products')>=0?'#059669':'#047857', color: '#ffffff'}} 
        onClick={()=>router.push("/products/search/all")}>Products</Button>
      <Button variant='text' size='small'
        sx={{textTransform: 'none', backgroundColor: pathname==='/trackorder'?'#059669':'#047857', color: '#ffffff'}} 
        onClick={()=>router.push("/trackorder")}>Track Order</Button>
      <Button variant='text' size='small'
        sx={{textTransform: 'none', backgroundColor: pathname==='/contactus'?'#059669':'#047857', color: '#ffffff'}} 
        onClick={()=>router.push("/contactus")}>Contact Us</Button>
      <Button variant='text' size='small'
        sx={{textTransform: 'none', backgroundColor: pathname==='/privacy'?'#059669':'#047857', color: '#ffffff'}} 
        onClick={()=>router.push("/privacy")}>Privacy</Button>
    </div>
  )
}

export default Navbar;