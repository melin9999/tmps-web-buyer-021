
import { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { ArrowDropDown, CameraAlt, Close, Search } from "@mui/icons-material";
import { Avatar, Button, CircularProgress, ClickAwayListener, Grow, IconButton, InputAdornment, Paper, Popper, TextField } from "@mui/material";

const HomeSearch = ({searchCategory, setSearchCategory, searchBrand, setSearchBrand, searchModel, 
  setSearchModel, searchDescription, setSearchDescription, searchClicked, width}) => {
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [serverError, setServerError] = useState(false);

  const [openBrand, setOpenBrand] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const categoryRef = useRef(null);
  const brandRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if(openCategory) getCategories();
  }, [openCategory]);

  useEffect(() => {
    if(openBrand) getBrands();
  }, [openBrand]);

  useEffect(() => {
    if(openModel) getModels();
  }, [openModel]);

  async function getCategories(){
    try{
      setServerError(false);
      setIsLoading1(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/supportdata/categories/", {});
        const values = [];
        response.data.data.rows.map(val => {
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "https://tm-web.techmax.lk/"+val.image_url;
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

  async function getBrands(){
    try{
      setServerError(false);
      setIsLoading2(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/supportdata/brands/", {});
        const values = [];
        response.data.data.rows.map(val => {
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "https://tm-web.techmax.lk/"+val.image_url;
          }
          values.push({
            id: val.id,
            description: val.description,
            code: val.code,
            image_url: imageUrl,
          });
        });
        setBrands(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading2(false);
    }
  }

  async function getModels(){
    try{
      setServerError(false);
      setIsLoading3(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/supportdata/models/", {});
        const values = [];
        response.data.data.rows.map(val => {
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "https://tm-web.techmax.lk/"+val.image_url;
          }
          values.push({
            id: val.id,
            description: val.description,
            code: val.code,
            image_url: imageUrl,
          });
        });
        setModels(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading3(false);
    }
  }

  return (
    <div className='form_fields_toolbar_container_home mt-5 w-full' style={{borderBottom: '1px solid #e8e8e8'}}>
      <div className='form_fields_toolbar_container_home_left_1'>
        <div className='form_fields_toolbar_container_home_left_1_container relative'>
          {width>=640 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-5 left-0'/>}
          {width>=640 && <span ref={brandRef} className='w-[0px] h-[30px] absolute top-5 left-0'/>}
          {width>=640 && <span ref={modelRef} className='w-[0px] h-[30px] absolute top-5 left-0'/>}
          {width>=320 && width<640 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
          {width>=320 && width<640 && <span ref={brandRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
          {width>=320 && width<640 && <span ref={modelRef} className='w-[0px] h-[30px] absolute top-[60px] left-0'/>}
          {width<320 && <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-2 left-0'/>}
          {width<320 && <span ref={brandRef} className='w-[0px] h-[30px] absolute top-[60px] left-0'/>}
          {width<320 && <span ref={modelRef} className='w-[0px] h-[30px] absolute top-[110px] left-0'/>}
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
                  <Paper className='flex flex-col' style={{width: width>=1152?1152:(width-30)}}>
                    <ClickAwayListener onClickAway={()=>setOpenCategory(false)}>
                      {isLoading1 ? 
                        <div className='flex flex-col items-center justify-center w-full min-h-[200px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100'>
                          <CircularProgress size={30} style={{color:"#71717a"}} />
                          <span className="text-sm mt-5 font-semibold text-gray-700">{"Loading..."}</span>
                        </div>:
                        <div className='flex flex-col justify-start items-start w-full'>
                          <div className='flex flex-row justify-between items-center w-full px-2 py-2 bg-white' style={{borderBottom: '1px solid #047857'}}>
                            <span className='text-md font-semibold text-emerald-700'>{"Categories"}</span>
                            <IconButton onClick={()=>setOpenCategory(false)} sx={{width: 22, height: 22, color: '#6b7280'}}><Close/></IconButton>
                          </div>
                          <div className='flex flex-row justify-start items-start w-full flex-wrap px-2 max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                            {categories.map(val=>
                              <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #A7F3D0'):'none'}}>
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
            <span className='form_text_field_constructed_label'>Brand</span>
            <span className='form_text_field_constructed_text' onClick={()=>setOpenBrand(val=>!val)}>{searchBrand.description}</span>
            <div className='form_text_field_constructed_actions'>
              <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchBrand({id: 0, description: "All"})}/>
              <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenBrand(val=>!val)}/>
            </div>
            <Popper
              open={openBrand}
              anchorEl={brandRef.current}
              placement='bottom-start'
              transition={true}
              style={{zIndex: 50}}
            >
              {({TransitionProps}) => (
                <Grow {...TransitionProps}>
                  <Paper className='flex flex-col' style={{width: width>=1152?1152:(width-30)}}>
                    <ClickAwayListener onClickAway={()=>setOpenBrand(false)}>
                      {isLoading2 ? 
                        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100'>
                          <CircularProgress size={30} style={{color:"#71717a"}} />
                          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
                        </div>:
                        <div className='flex flex-col justify-start items-start w-full'>
                          <div className='flex flex-row justify-between items-center w-full px-2 py-2 bg-white' style={{borderBottom: '1px solid #047857'}}>
                            <span className='text-md font-semibold text-emerald-700'>{"Brands"}</span>
                            <IconButton onClick={()=>setOpenBrand(false)} sx={{width: 22, height: 22, color: '#6b7280'}}><Close/></IconButton>
                          </div>
                          <div className='flex flex-row justify-start items-start w-full flex-wrap px-2 max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                            {brands.map(val=>
                              <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #A7F3D0'):'none'}}>
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
            <span className='form_text_field_constructed_label'>Model</span>
            <span className='form_text_field_constructed_text' onClick={()=>setOpenModel(val=>!val)}>{searchModel.description}</span>
            <div className='form_text_field_constructed_actions'>
              <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchModel({id: 0, description: "All", brandId: 0, brandDescription: "All"})}/>
              <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenModel(val=>!val)}/>
            </div>
            <Popper
              open={openModel}
              anchorEl={modelRef.current}
              placement='bottom-start'
              transition={true}
              style={{zIndex: 50}}
            >
              {({TransitionProps}) => (
                <Grow {...TransitionProps}>
                  <Paper className='flex flex-col' style={{width: width>=1152?1152:(width-30)}}>
                    <ClickAwayListener onClickAway={()=>setOpenModel(false)}>
                      {isLoading3 ? 
                        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] md:h-[200px] sm:h-[200px] xs:h-[150px] bg-slate-100'>
                          <CircularProgress size={30} style={{color:"#71717a"}} />
                          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
                        </div>:
                        <div className='flex flex-col justify-start items-start w-full'>
                          <div className='flex flex-row justify-between items-center w-full px-2 py-2 bg-white' style={{borderBottom: '1px solid #047857'}}>
                            <span className='text-md font-semibold text-emerald-700'>{"Models"}</span>
                            <IconButton onClick={()=>setOpenModel(false)} sx={{width: 22, height: 22, color: '#6b7280'}}><Close/></IconButton>
                          </div>
                          <div className='flex flex-row justify-start items-start w-full flex-wrap px-2 max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                            {models.map(val=>
                              <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #A7F3D0'):'none'}}>
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