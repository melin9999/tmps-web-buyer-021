'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Avatar, Button, CircularProgress, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { CameraAlt, Check, Close, Home, KeyboardArrowDown, KeyboardArrowRight, Menu, Search } from "@mui/icons-material";
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import Image from 'next/image';

const Navbar = () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { width=500, height=500 } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const categoryRef = useRef(null);
  const brandRef = useRef(null);

  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
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

  useEffect(() => {
    if(openCategory) getCategories();
  }, [openCategory]);

  useEffect(() => {
    if(openBrand) getBrands();
  }, [openBrand]);

  async function getCategories(){
    try{
      setServerError(false);
      setIsLoading1(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/categories/find-sub-categories-for-home-search/", {});
        const values = [];
        response.data.data.rows.map(val => {
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "http://localhost:8000/"+val.image_url;
          }
          var sub_categories = [];
          val.sub_categories.map(val1=>{
            var imageUrl1 = "";
            if(val1.image_url==="none"){
              imageUrl1 = "none";
            }
            else{
              imageUrl1 = "http://localhost:8000/"+val1.image_url;
            }
            sub_categories.push({
              id: val1.id,
              description: val1.description,
              code: val1.code,
              image_url: imageUrl1,
            });
          });
          values.push({
            id: val.id,
            description: val.description,
            code: val.code,
            image_url: imageUrl,
            sub_categories: sub_categories,
          });
        });
        setCategories(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading1(false);
    }
  };

  async function getBrands(){
    try{
      setServerError(false);
      setIsLoading2(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/brands/active/", {});
        const values = [];
        response.data.data.rows.map(val => {
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "http://localhost:8000/"+val.image_url;
          }
          values.push({
            id: val.id,
            description: val.description,
            code: val.code,
            image_url: imageUrl,
          });
        });
        console.log(values);
        setBrands(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading2(false);
    }
  };

  return (
    <div className='flex flex-row w-full justify-between items-center max-w-7xl relative' style={{backgroundColor: '#77bd1f'}}>
      <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>
      <span ref={brandRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>
      <div className='hidden xl:flex flex-row justify-center items-center gap-1'>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>router.push("/home")} startIcon={<Home sx={{width: 18, height: 18, color: '#fff'}}/>} endIcon={pathname.indexOf('/home')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Home</Button>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>setOpenCategory(val=>!val)} endIcon={pathname.indexOf('/products')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Products</Button>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>setOpenBrand(val=>!val)} endIcon={pathname.indexOf('/brands')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Brands</Button>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>router.push("/spares")} endIcon={pathname.indexOf('/spares')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Spares</Button>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>router.push("/installations")} endIcon={pathname.indexOf('/installations')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Installations</Button>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>router.push("/shop-locator")} endIcon={pathname.indexOf('/shop-locator')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Shop Locator</Button>
        <Button variant='text'
          sx={{textTransform: 'none', color: '#fff'}} 
          onClick={()=>router.push("/services")} endIcon={pathname.indexOf('/services')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowDown sx={{width: 22, height: 22, color: '#fff'}}/>}>Services</Button>
        
      </div>
      <div className='flex xl:hidden w-full justify-start items-center relative' style={{backgroundColor: '#77bd1f'}}>
        <IconButton ref={anchorRef} size='small' onClick={handleToggle}><Menu sx={{width: 28, height: 28, color: '#fff'}}/></IconButton>
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
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown} sx={{width: 230, backgroundColor: '#77bd1f'}}>                    
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        router.push("/home");
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center pb-2' style={{borderBottom: '1px solid #fff'}}>
                        <Home sx={{width: 18, height: 18, color: '#fff'}}/>
                        <span className='flex flex-1 text-sm text-white font-semibold pl-1'>Home</span>
                        {pathname.indexOf('/home')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        setOpenCategory(val=>!val);
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center pb-2' style={{borderBottom: '1px solid #fff'}}>
                        <span className='flex text-sm text-white font-semibold'>Products</span>
                        {pathname.indexOf('/products')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        setOpenBrand(val=>!val);
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center pb-2' style={{borderBottom: '1px solid #fff'}}>
                        <span className='text-sm text-white font-semibold'>Brands</span>
                        {pathname.indexOf('/brands')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        router.push("/spares");
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center pb-2' style={{borderBottom: '1px solid #fff'}}>
                        <span className='text-sm text-white font-semibold'>Spares</span>
                        {pathname.indexOf('/spares')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        router.push("/installations");
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center pb-2' style={{borderBottom: '1px solid #fff'}}>
                        <span className='text-sm text-white font-semibold'>Installations</span>
                        {pathname.indexOf('/installations')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        router.push("/shop-locator");
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center pb-2' style={{borderBottom: '1px solid #fff'}}>
                        <span className='text-sm text-white font-semibold'>Shop Locator</span>
                        {pathname.indexOf('/shop-locator')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        setOpen(false);
                        router.push("/services");
                      }}
                      size='small'
                    >
                      <div className='flex w-full justify-between items-center'>
                        <span className='text-sm text-white font-semibold'>Services</span>
                        {pathname.indexOf('/services')>=0?<Check sx={{width: 22, height: 22, color: '#fff'}}/>:<KeyboardArrowRight sx={{width: 22, height: 22, color: '#fff'}}/>}
                      </div>
                    </MenuItem>
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <div className='flex flex-row justify-center items-center bg-white p-1 w-[250px]'>
          <Search sx={{width: 22, height: 22, color: '#94a3b8'}}/>
          <input type='text' className='border-none outline-none w-full'/>
        </div>
        <Button 
          variant='text' 
          style={{textTransform: 'none'}} 
          startIcon={<Search />}
          onClick={()=>{}}
          size='small'
          sx={{color: '#fff'}}
        >Search</Button>
      </div>
      <Popper
        open={openCategory}
        anchorEl={categoryRef.current}
        placement='bottom-start'
        transition={true}
        style={{zIndex: 50}}
      >
        {({TransitionProps}) => (
          <Grow {...TransitionProps}>
            <Paper className='flex flex-col w-[100%] max-w-7xl'>
              <ClickAwayListener onClickAway={()=>setOpenCategory(false)}>
                {isLoading1 ? 
                  <div className='flex flex-col items-center justify-center w-full min-h-[200px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100 shadow-xl' style={{width: width>=1280?1280:(width)}}>
                    <CircularProgress size={30} style={{color:"#71717a"}} />
                    <span className="text-sm mt-5 font-semibold text-gray-700">{"Loading..."}</span>
                  </div>:
                  <div className='flex flex-col justify-start items-start w-[100%] pb-2 px-3 bg-white shadow-xl' style={{width: width>=1280?1280:(width)}}>
                    <div className='flex flex-row justify-between items-center w-full py-2'>
                      <span className='text-md font-semibold text-emerald-700'>{}</span>
                      <IconButton onClick={()=>setOpenCategory(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                    </div>
                    <div className='flex flex-row justify-start items-start w-full flex-wrap max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                      {categories.map(val=>
                        <div key={val.id} className='flex flex-col justify-center items-start w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5'>
                          <div className='flex flex-row justify-start items-center w-full h-[40px] bg-[#dcfce7] gap-2 px-1'>
                            <div className='flex flex-col justify-center items-center w-[30px] h-[30px]'>
                              {val.image_url==="none" ? 
                                <CameraAlt sx={{width: 30, height: 30, color: '#cbd5e1'}}/> : 
                                <Avatar src={val.image_url} sx={{width: 30, height: 30}}/>
                              }
                            </div>
                            <span className='text-xs lg:text-sm'>{val.description}</span>
                          </div>
                          <div className='flex flex-col justify-center items-center w-full pr-2'>
                            {val.sub_categories.map(val1=>
                              <div key={val1.id} className='flex flex-row justify-start items-center w-full h-[40px] gap-2 py-3 px-1 cursor-pointer hover:bg-slate-100' style={{borderRight: width>440?('1px solid #D1D5DB'):'none'}} onClick={()=>{setOpenCategory(false);}}>
                                <div className='flex flex-col justify-center items-center w-[30px] h-[30px]'>
                                  {val1.image_url==="none" ? 
                                    <CameraAlt sx={{width: 30, height: 30, color: '#cbd5e1'}}/> : 
                                    <Avatar src={val1.image_url} sx={{width: 30, height: 30}}/>
                                  }
                                </div>
                                <span className='text-xs lg:text-sm'>{val1.description}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                }
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Popper
        open={openBrand}
        anchorEl={brandRef.current}
        placement='bottom-start'
        transition={true}
        style={{zIndex: 50}}
      >
        {({TransitionProps}) => (
          <Grow {...TransitionProps}>
            <Paper className='flex flex-col w-[100%] max-w-7xl'>
              <ClickAwayListener onClickAway={()=>setOpenBrand(false)}>
                {isLoading1 ? 
                  <div className='flex flex-col items-center justify-center w-full min-h-[200px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100 shadow-xl' style={{width: width>=1280?1280:(width)}}>
                    <CircularProgress size={30} style={{color:"#71717a"}} />
                    <span className="text-sm mt-5 font-semibold text-gray-700">{"Loading..."}</span>
                  </div>:
                  <div className='flex flex-col justify-start items-start w-[100%] pb-2 px-3 bg-white shadow-xl' style={{width: width>=1280?1280:(width)}}>
                    <div className='flex flex-row justify-between items-center w-full py-2'>
                      <span className='text-md font-semibold text-emerald-700'>{}</span>
                      <IconButton onClick={()=>setOpenBrand(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                    </div>
                    <div className='flex flex-row justify-start items-start w-full flex-wrap max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                      {brands.map(val=>
                        <div key={val.id} className='flex flex-row justify-start items-center w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5'>
                          <div className='flex flex-col justify-center items-center w-[80px] h-[30px] relative'>
                            {val.image_url==="none" ? 
                              <CameraAlt sx={{width: 30, height: 30, color: '#cbd5e1'}}/> : 
                              <Image src={val.image_url} alt="brand image" fill sizes='80px' priority={true} style={{objectFit: 'contain'}}/>
                            }
                          </div>
                          <span className='text-xs lg:text-sm'>{val.description}</span>
                        </div>
                      )}
                    </div>
                  </div>
                }
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

    </div>
  )
}

export default Navbar;