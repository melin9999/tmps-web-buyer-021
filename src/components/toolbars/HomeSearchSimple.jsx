
import { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { ArrowDropDown, CameraAlt, Close, Search } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, ClickAwayListener, Grow, IconButton, InputAdornment, Paper, Popper, TextField } from "@mui/material";

const HomeSearchSimple = ({searchSubCategory, setSearchSubCategory,
   searchDescription, setSearchDescription, searchClicked, width}) => {
  const [isLoading1, setIsLoading1] = useState(true);
  const [serverError, setServerError] = useState(false);

  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const subCategoryRef = useRef(null);

  useEffect(() => {
    if(openSubCategory) getSubCategories();
  }, [openSubCategory]);

  async function getSubCategories(){
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
              id: val.id,
              description: val.description,
              code: val.code,
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
        console.log(values);
        setSubCategories(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading1(false);
    }
  }

  return (
    <div className='form_fields_toolbar_container_home_2'>
      <div className='form_fields_toolbar_container_home_left_2 relative'>
        {width>=768 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-5 -left-1'/>}
        {width>=640 && width<768 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-2 -left-0'/>}
        {width>=320 && width<640 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
        {width<320 && <span ref={subCategoryRef} className='w-[0px] h-[30px] absolute top-[60px] left-0'/>}
        <div className='form_fields_toolbar_container_home_left_2_container'>
          <div className='form_text_field_constructed_home_2 cursor-pointer'>
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
                      {isLoading1 ? 
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
      <div className='form_fields_toolbar_container_home_right_2'>
        <div className='form_fields_toolbar_container_home_right_2_container'>
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

export default HomeSearchSimple;