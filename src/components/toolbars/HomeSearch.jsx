
import { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { ArrowDropDown, CameraAlt, Close, Search } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, ClickAwayListener, Grow, IconButton, InputAdornment, Paper, Popper, TextField } from "@mui/material";

const HomeSearch = ({searchCategory, setSearchCategory, searchSubCategory, setSearchSubCategory,
   searchDescription, setSearchDescription, searchClicked, width}) => {
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [serverError, setServerError] = useState(false);

  const [openCategory, setOpenCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);

  useEffect(() => {
    if(openCategory) getCategories();
  }, [openCategory]);

  useEffect(() => {
    if(openSubCategory) getSubCategories();
  }, [openSubCategory]);

  async function getCategories(){
    try{
      setServerError(false);
      setIsLoading1(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/categories/active/", {});
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
        setCategories(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading1(false);
    }
  }

  async function getSubCategories(){
    try{
      setServerError(false);
      setIsLoading2(true);
      var error = false;
      var whereData = {};
      if(searchCategory.id>0){
        whereData.categoryId = searchCategory.id
      }
      if(!error){
        const response = await axios.post("/api/sub-categories/find-for-category/", whereData);
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
        setSubCategories(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading2(false);
    }
  }

  return (
    <div className='form_fields_toolbar_container_home w-full'>
      <div className='form_fields_toolbar_container_home_left_1 relative'>
        {width>=768 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-5 -left-1'/>}
        {width>=768 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-5 -left-1'/>}
        {width>=640 && width<768 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-2 -left-0'/>}
        {width>=640 && width<768 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-2 -left-0'/>}
        {width>=320 && width<640 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
        {width>=320 && width<640 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
        {width<320 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
        {width<320 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-[60px] left-0'/>}
        <div className='form_fields_toolbar_container_home_left_1_container'>
          <div className='form_text_field_constructed_home cursor-pointer'>
            <span className='form_text_field_constructed_label'>Category</span>
            <span className='form_text_field_constructed_text' onClick={()=>setOpenCategory(val=>!val)}>{searchCategory.description}</span>
            <div className='form_text_field_constructed_actions'>
              <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchCategory({id: 0, description: "All"})}/>
              <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenCategory(val=>!val)}/>
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
                  <Paper className='flex flex-col' style={{width: width>=1152?1122:(width-30)}}>
                    <ClickAwayListener onClickAway={()=>setOpenCategory(false)}>
                      {isLoading1 ? 
                        <div className='flex flex-col items-center justify-center w-full min-h-[200px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100 shadow-xl'>
                          <CircularProgress size={30} style={{color:"#71717a"}} />
                          <span className="text-sm mt-5 font-semibold text-gray-700">{"Loading..."}</span>
                        </div>:
                        <div className='flex flex-col justify-start items-start w-full pb-2 px-3 bg-white shadow-xl'>
                          <div className='flex flex-row justify-between items-center w-full py-2' style={{borderBottom: '1px solid #D1D5DB'}}>
                            <span className='text-md font-semibold text-emerald-700'>{"Categories"}</span>
                            <IconButton onClick={()=>setOpenCategory(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                          </div>
                          <div className='flex flex-row justify-start items-start w-full flex-wrap max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                            {categories.map(val=>
                              <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #D1D5DB'):'none'}} onClick={()=>{setSearchCategory({id: val.id, description: val.description});setOpenCategory(false);}}>
                                <div className='flex flex-col justify-center items-center w-[30px] h-[30px]'>
                                  {val.image_url==="none" ? 
                                    <CameraAlt sx={{width: 30, height: 30, color: '#cbd5e1'}}/> : 
                                    <Avatar src={val.image_url} sx={{width: 30, height: 30}}/>
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
          <div className='form_text_field_constructed_home cursor-pointer'>
            <span className='form_text_field_constructed_label'>Sub Category</span>
            <span className='form_text_field_constructed_text' onClick={()=>setOpenSubCategory(val=>!val)}>{searchSubCategory.description}</span>
            <div className='form_text_field_constructed_actions'>
              <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchSubCategory({id: 0, description: "All"})}/>
              <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenSubCategory(val=>!val)}/>
            </div>
            <Popper
              open={openSubCategory}
              anchorEl={subCategoryRef.current}
              placement='bottom-start'
              transition={true}
              style={{zIndex: 50}}
            >
              {({TransitionProps}) => (
                <Grow {...TransitionProps}>
                  <Paper className='flex flex-col' style={{width: width>=1152?1122:(width-30)}}>
                    <ClickAwayListener onClickAway={()=>setOpenSubCategory(false)}>
                      {isLoading2 ? 
                        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100 shadow-xl'>
                          <CircularProgress size={30} style={{color:"#71717a"}} />
                          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
                        </div>:
                        <div className='flex flex-col justify-start items-start w-full pb-2 px-3 bg-white shadow-xl'>
                          <div className='flex flex-row justify-between items-center w-full py-2' style={{borderBottom: '1px solid #D1D5DB'}}>
                            <span className='text-md font-semibold text-emerald-700'>{"Sub Categories"}</span>
                            <IconButton onClick={()=>setOpenSubCategory(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                          </div>
                          <div className='flex flex-row justify-start items-start w-full flex-wrap max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                            {subCategories.map(val=>
                              <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #D1D5DB'):'none'}} onClick={()=>{setSearchSubCategory({id: val.id, description: val.description}); setOpenSubCategory(false);}}>
                                <div className='flex flex-col justify-center items-center w-[30px] h-[30px]'>
                                  {val.image_url!=="none" && <Avatar src={val.image_url} sx={{width: 30, height: 30}}/>}
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
        </div>
      </div>
      <div className='form_fields_toolbar_container_home_right'>
        <div className='form_fields_toolbar_container_home_right_container'>
          <TextField 
            id='description'
            label="Search" 
            variant="outlined" 
            className='form_text_field' 
            value={searchDescription} 
            onChange={event=>setSearchDescription(event.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search sx={{width: 26, height: 26, color: '#94a3b8'}}/></InputAdornment>,
            }}
            size='small' 
            inputProps={{style: {fontSize: 13}}}
            SelectProps={{style: {fontSize: 13}}}
            InputLabelProps={{style: {fontSize: 15}}}
          />
          <Button 
            variant='contained' 
            style={{textTransform: 'none'}} 
            startIcon={<Search />}
            onClick={searchClicked}
            size='small'
            sx={{width: 110}}
          >Search</Button>
        </div>
      </div>
    </div>
  )
}

export default HomeSearch;