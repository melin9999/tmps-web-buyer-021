'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {  signOut, useSession } from 'next-auth/react';
import { Avatar, Button, CircularProgress, ClickAwayListener, Divider, Grow, IconButton, ListItemIcon, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { DirectionsCar, Favorite, FileCopy, Login, Logout, Menu, Notifications, Person, PersonAdd, Settings, ShoppingCart } from "@mui/icons-material";

const MainHeader = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageUrl, setImageUrl] = useState("none");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    if(session && session.user){
      setIsAuthenticated(true);
      if(session.user.image==="none"){
        if(session.user.googleImage!==""){
          setImageUrl(session.user.googleImage);
        }
      }
      else{
        setImageUrl("https://tm-web.techmax.lk/"+session.user.image);
      }
    }
    else{
      setIsAuthenticated(false);
    }
  }, [session]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event){
    if(event.key==='Tab') {
      event.preventDefault();
      setOpen(false);
    } 
    else if(event.key==='Escape'){
      setOpen(false);
    }
  }

  const onSignOut = async () => {
    try {
      localStorage.removeItem('buyer_inventory_search_data');
      localStorage.removeItem('buyer_inventory_search_data');
      localStorage.removeItem('buyer_inventory_search_rpp');
      localStorage.removeItem('buyer_inventory_search_nop');
      localStorage.removeItem('buyer_inventory_search_page');
      localStorage.removeItem('buyer_inventory_search_sort_by');
      localStorage.removeItem('buyer_inventory_search_order');
      localStorage.removeItem('buyer_inventory_search_description');
      localStorage.removeItem('buyer_inventory_search_brand');
      localStorage.removeItem('buyer_inventory_search_model');
      localStorage.removeItem('buyer_inventory_search_category');
      localStorage.removeItem('buyer_inventory_search_status');

      localStorage.removeItem('buyer_orders_search_data');
      localStorage.removeItem('buyer_orders_search_rpp');
      localStorage.removeItem('buyer_orders_search_nop');
      localStorage.removeItem('buyer_orders_search_page');
      localStorage.removeItem('buyer_orders_search_sort_by');
      localStorage.removeItem('buyer_orders_search_order');
      localStorage.removeItem('buyer_orders_search_start_date');
      localStorage.removeItem('buyer_orders_search_end_date');
      localStorage.removeItem('buyer_orders_search_status');

      localStorage.removeItem('buyer_deliveries_search_data');
      localStorage.removeItem('buyer_deliveries_search_rpp');
      localStorage.removeItem('buyer_deliveries_search_nop');
      localStorage.removeItem('buyer_deliveries_search_page');
      localStorage.removeItem('buyer_deliveries_search_sort_by');
      localStorage.removeItem('buyer_deliveries_search_order');
      localStorage.removeItem('buyer_deliveries_search_start_date');
      localStorage.removeItem('buyer_deliveries_search_end_date');
      localStorage.removeItem('buyer_deliveries_search_status');
    } 
    catch (e) {
      console.log("put storage error");
    }
    setIsLoading(true);
    signOut();
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full fixed top-0 z-50">
      <div className="flex flex-row justify-between items-center w-full max-w-6xl bg-white" style={{borderBottom: "3px solid #047857"}}>
        <div className='flex flex-row flex-1'>
          <div onClick={()=>router.push("/")} className='flex flex-row gap-1 px-2 h-[40px] justify-start items-center cursor-pointer'>
            <div className='w-[50px] h-[30px] relative'><Image src='/logo-small.png' alt='logo' fill sizes='50px' priority={true} style={{objectFit: 'contain'}}/></div>
            <p className='font-bold text-xl sm:text-2xl text-emerald-700 hidden xs:flex'>TeckMax.lk</p>
          </div>
        </div>
        {status==="loading" && 
          <div className="flex flex-row justify-center items-center px-2">
            <CircularProgress size={24}/>
          </div>
        }
        {status==="authenticated" && 
          <>
            <div className="flex flex-row justify-center items-center gap-1">
              <IconButton onClick={()=>router.push('/notifications')}><Notifications sx={{width: 22, height: 22, color: '#047857'}}/></IconButton>
              <IconButton onClick={()=>router.push('/cart')}><ShoppingCart sx={{width: 22, height: 22, color: '#047857'}}/></IconButton>
              <div className='flex flex-row justify-center items-center gap-2 cursor-pointer' onClick={()=>router.push('/profile')}>
                {imageUrl==="none"?<Person sx={{width: 30, height: 30, color: '#047857'}}/>:<Avatar src={imageUrl} sx={{width: 30, height: 30}}/>}
                <div className='flex-col justify-center items-start w-30 hidden md:flex'>
                  <span className='text-xs font-medium'>{session?.user.name}</span>
                  <span className='text-xs text-emerald-700'>{"Buyer"}</span>
                </div>
              </div>
              <IconButton ref={anchorRef} onClick={handleToggle}><Menu sx={{width: 28, height: 28, color: '#047857'}}/></IconButton>
            </div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              placement="bottom-start"
              transition={true}
              disablePortal={true}
            >
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={()=>setOpen(false)}>
                      <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown} sx={{width: 220}}>
                        <div className='flex-col justify-center items-start px-4 py-2 bg-white flex md:hidden'>
                          <span className='text-sm'>{session.user.name}</span>
                          <span className='text-xs text-emerald-700'>{"Buyer"}</span>
                        </div>
                        <Divider className='flex md:hidden'/>
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/notifications");
                          }}
                        >
                          <ListItemIcon><Notifications sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Notifications</span>
                        </MenuItem>
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/cart");
                          }}
                        >
                          <ListItemIcon><ShoppingCart sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Cart</span>
                        </MenuItem>
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/favorites");
                          }}
                        >
                          <ListItemIcon><Favorite sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Favorites</span>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/track-order");
                          }}
                        >
                          <ListItemIcon><DirectionsCar sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Track Order</span>
                        </MenuItem>
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/orders");
                          }}
                        >
                          <ListItemIcon><FileCopy sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Order History</span>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/profile");
                          }}
                        >
                          <ListItemIcon><Person sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Profile</span>
                        </MenuItem>
                        <MenuItem
                          onClick={()=>{
                            setOpen(false);
                            router.push("/settings");
                          }}
                        >
                          <ListItemIcon><Settings sx={{width: 18, height: 18, color: '#047857'}}/></ListItemIcon>
                          <span className='text-sm'>Settings</span>
                        </MenuItem>
                        <Divider />
                        <MenuItem 
                          onClick={()=>{
                            setOpen(false);
                            onSignOut();
                          }}
                        >
                          <ListItemIcon>{isLoading?<CircularProgress size={18} style={{'color': '#047857'}}/>:<Logout sx={{width: 18, height: 18, color: '#047857'}}/>}</ListItemIcon>
                          <span className='text-sm'>Sign Out</span>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        }
        {status==="unauthenticated" && 
          <div className="flex flex-row justify-center items-center gap-1 px-2">
            <Button 
              variant='contained' 
              style={{textTransform: 'none'}} 
              startIcon={<Login />}
              onClick={()=>router.push('/signin')}
              size='small'
            >Sign In</Button>
            <Button 
              variant='outlined' 
              style={{textTransform: 'none'}} 
              startIcon={<PersonAdd />}
              onClick={()=>router.push('/signup')}
              size='small'
            >Sign Up</Button>
          </div>
        }
      </div>
    </div>
  )
}

export default MainHeader;