
import { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { ArrowDropDown, CameraAlt, Close, ExpandMore, ImportExport } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Checkbox, CircularProgress, ClickAwayListener, FormControlLabel, Grow, IconButton, InputAdornment, MenuItem, Paper, Popper, Slider, TextField } from "@mui/material";
import Image from 'next/image';

const ProductsSearch = ({searchCategory, setSearchCategory, searchBrand, setSearchBrand, searchModel, 
  setSearchModel, searchSortBy, setSearchSortBy, searchOrder, setSearchOrder, editItemFeatures, setEditItemFeatures, width}) => {
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);
  const [serverError, setServerError] = useState(false);

  const [browserWidth, setBrowserWidth] = useState(750);
  const [openBrand, setOpenBrand] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const categoryRef = useRef(null);
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const [searchFeatures, setSearchFeatures] = useState([]);

  useEffect(() => {
    if(width>=1152){
      setBrowserWidth(750);
    }
    else if(width>=768 && width<1152){
      setBrowserWidth(width-270);
    }
    else{
      setBrowserWidth(width-20);
    }
  }, [width]);

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
          var add = false;
          if(searchBrand.id>0){
            if(val.brand_id===searchBrand.id){
              add = true;
            }
          }
          else{
            add = true;
          }
          if(add){
            if(val.image_url==="none"){
              imageUrl = "none";
            }
            else{
              imageUrl = "https://tm-web.techmax.lk/"+val.image_url;
            }
            values.push({
              id: val.id,
              description: val.description,
              brandId: val.brand_id,
              brandDescription: val.brand.description,
            });
          }
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

  useEffect(() => {
    if(searchCategory.id===0){
      getFeatures();
    }
    else{
      getFeaturesForCategory();
    }
  }, [searchCategory])

  const getFeatures = async () => {
    try{
      setIsLoading4(true);
      const response = await axios.post(`/api/features/active`, {});
      if (!response.data.error) {
        var values = [];
        response.data.data.map(val=>{          
          values.push({
            id: val.id,
            type: val.type,
            description: val.description,
            image_url: val.image_url,
            sub_features: val.sub_features,
          });
        });
        setSearchFeatures(values);
      } 
    }
    catch(error){
      
    }
    finally{
      setIsLoading4(false);
    }
  }

  const getFeaturesForCategory = async () => {
    try{
      setIsLoading4(true);
      const response = await axios.post(`/api/features/find-for-category`, {
        category_id: parseInt(searchCategory.id),
      });
      if (!response.data.error) {
        var values = [];
        response.data.data.map(val=>{          
          values.push({
            id: val.feature.id,
            type: val.feature.type,
            description: val.feature.description,
            image_url: val.feature.image_url,
            sub_features: val.feature.sub_features,
          });
        });
        setSearchFeatures(values);
      } 
    }
    catch(error){
      
    }
    finally{
      setIsLoading4(false);
    }
  }
  
  const subFeatureAdded = async (value, type, featureId) => {
    
  }

  return (
    <div className='flex flex-col justify-center w-full items-start py-5 pl-2 relative bg-white'>
      {width>=768 && 
        <>
          <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-0 right-0'/>
          <span ref={brandRef} className='w-[0px] h-[30px] absolute top-0 right-0'/>
          <span ref={modelRef} className='w-[0px] h-[30px] absolute top-0 right-0'/>
        </>
      }
      {width<768 && 
        <>
          <span ref={categoryRef} className='w-[0px] h-[30px] absolute top-0 left-0'/>
          <span ref={brandRef} className='w-[0px] h-[30px] absolute top-0 left-0'/>
          <span ref={modelRef} className='w-[0px] h-[30px] absolute top-0 left-0'/>
        </>
      }
      <div className='flex flex-col mb-5 w-[230px]'>
        <div className='flex justify-between items-center w-full rounded h-[35px] px-3 relative bg-white cursor-pointer' style={{border: '1px solid #bdbdbd'}}>
          <span className='form_text_field_constructed_label'>Category</span>
          <span className='form_text_field_constructed_text' onClick={()=>setOpenCategory(val=>!val)}>{searchCategory.description}</span>
          <div className='form_text_field_constructed_actions'>
            <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchCategory({id: 0, description: "All"})}/>
            <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenCategory(val=>!val)}/>
          </div>
        </div>
      </div>
      <div className='flex flex-col mb-5 w-[230px]'>
        <div className='flex justify-between items-center w-full rounded h-[35px] px-3 relative bg-white cursor-pointer' style={{border: '1px solid #bdbdbd'}}>
          <span className='form_text_field_constructed_label'>Brand</span>
          <span className='form_text_field_constructed_text' onClick={()=>setOpenBrand(val=>!val)}>{searchBrand.description}</span>
          <div className='form_text_field_constructed_actions'>
            <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchBrand({id: 0, description: "All"})}/>
            <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenBrand(val=>!val)}/>
          </div>
        </div>
      </div>
      <div className='flex flex-col mb-5 w-[230px]'>
        <div className='flex justify-between items-center w-full rounded h-[35px] px-3 relative bg-white cursor-pointer' style={{border: '1px solid #bdbdbd'}}>
          <span className='form_text_field_constructed_label'>Model</span>
          <span className='form_text_field_constructed_text' onClick={()=>setOpenModel(val=>!val)}>{searchModel.description}</span>
          <div className='form_text_field_constructed_actions'>
            <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchModel({id: 0, description: "All", brandId: 0, brandDescription: "All"})}/>
            <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenModel(val=>!val)}/>
          </div>
        </div>
      </div>

      <div className='flex flex-col mb-5 w-[230px]'>
        <TextField
          className='form_text_field'
          id='sort-by-2'
          select={true}
          value={searchSortBy}
          onChange={event=>setSearchSortBy(event.target.value)} 
          label='Sort By'
          size='small'
          inputProps={{style: {fontSize: 13}}}
          SelectProps={{style: {fontSize: 13}}}
          InputLabelProps={{style: {fontSize: 15}}}
        >
          <MenuItem value={"id"}>ID</MenuItem>
          <MenuItem value={"index"}>Index</MenuItem>
          <MenuItem value={"description"}>Description</MenuItem>
          <MenuItem value={"status"}>Status</MenuItem>
        </TextField>
      </div>
      <div className='flex flex-col mb-5 w-[230px]'>
        <TextField
          className='form_text_field'
          id='order'
          select={true}
          value={searchOrder}
          onChange={event=>setSearchOrder(event.target.value)} 
          label='Order'
          size='small'
          InputProps={{
            startAdornment: <InputAdornment position="start"><ImportExport sx={{width: 20, height: 20, color: '#666'}}/></InputAdornment>,
          }}
          inputProps={{style: {fontSize: 13}}}
          SelectProps={{style: {fontSize: 13}}}
          InputLabelProps={{style: {fontSize: 15}}}
        >
          <MenuItem value={"ASC"}>Ascending</MenuItem>
          <MenuItem value={"DESC"}>Descending</MenuItem>
        </TextField>
      </div>

      <div className='flex flex-col w-[230px]'>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <div className='flex flex-row justify-between items-center w-full'>
              <span className='text-sm ml-2 w-full'>{"Price"}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </AccordionDetails>
        </Accordion>
        {searchFeatures.length>0 && searchFeatures.map(val=>
          <Accordion key={val.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex justify-center items-center w-[26px] h-[26px] rounded-[13px] relative overflow-hidden'>
                  {val.image_url==="none" ? 
                    <div></div> : 
                    <Image src={"https://tm-web.techmax.lk/"+val.image_url} alt="feature image" fill sizes='26px' priority={true} style={{objectFit: 'cover'}}/>
                  }
                </div>
                <span className='text-sm ml-2 w-full'>{val.description}</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {val.sub_features.length>0 && val.sub_features.map(val1=>
                <FormControlLabel key={val1.id} id={'sub-feature-'+val1.id}
                  value={val1.id} checked={editItemFeatures.findIndex(val2=>val2.sub_feature_id===val1.id)>-1}
                  onChange={(event)=>subFeatureAdded(event.target.value, val.type, val.id)}
                  control={<Checkbox/>} 
                  label={
                    <div className='flex flex-row justify-start items-center w-[160px] overflow-hidden'>
                      <div className='flex justify-center items-center w-[26px] h-[26px] rounded-[13px] relative overflow-hidden'>
                        {val1.image_url==="none" ? 
                          <span></span> : 
                          <Image src={"https://tm-web.techmax.lk/"+val1.image_url} alt="feature image" fill sizes='26px' priority={true} style={{objectFit: 'cover'}}/>
                        }
                      </div>
                      <span className="text-sm mb-1 ml-3">{val1.description}</span>
                    </div>
                  }
                />
              )}
            </AccordionDetails>
          </Accordion>
        )}
      </div>

      <Popper
        open={openCategory}
        anchorEl={categoryRef.current}
        placement={width>768?'right-start':'top-start'}
        transition={true}
        style={{zIndex: 50}}
      >
        {({TransitionProps}) => (
          <Grow {...TransitionProps}>
            <Paper className='flex flex-col' style={{width: browserWidth}}>
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
                          <span className='text-xs'>{val.description}</span>
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
        placement={width>768?'right-start':'top-start'}
        transition={true}
        style={{zIndex: 50}}
      >
        {({TransitionProps}) => (
          <Grow {...TransitionProps}>
            <Paper className='flex flex-col' style={{width: browserWidth}}>
              <ClickAwayListener onClickAway={()=>setOpenBrand(false)}>
                {isLoading2 ? 
                  <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-100 shadow-xl'>
                    <CircularProgress size={30} style={{color:"#71717a"}} />
                    <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
                  </div>:
                  <div className='flex flex-col justify-start items-start w-full pb-2 px-3 bg-white shadow-xl'>
                    <div className='flex flex-row justify-between items-center w-full py-2' style={{borderBottom: '1px solid #D1D5DB'}}>
                      <span className='text-md font-semibold text-emerald-700'>{"Brands"}</span>
                      <IconButton onClick={()=>setOpenBrand(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                    </div>
                    <div className='flex flex-row justify-start items-start w-full flex-wrap max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                      {brands.map(val=>
                        <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #D1D5DB'):'none'}} onClick={()=>{setSearchBrand({id: val.id, description: val.description}); setOpenBrand(false);}}>
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
      <Popper
        open={openModel}
        anchorEl={modelRef.current}
        placement={width>768?'right-start':'top-start'}
        transition={true}
        style={{zIndex: 50}}
      >
        {({TransitionProps}) => (
          <Grow {...TransitionProps}>
            <Paper className='flex flex-col' style={{width: browserWidth}}>
              <ClickAwayListener onClickAway={()=>setOpenModel(false)}>
                {isLoading3 ? 
                  <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] md:h-[200px] sm:h-[200px] xs:h-[150px] bg-slate-100 shadow-xl'>
                    <CircularProgress size={30} style={{color:"#71717a"}} />
                    <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
                  </div>:
                  <div className='flex flex-col justify-start items-start w-full pb-2 px-3 bg-white shadow-xl'>
                    <div className='flex flex-row justify-between items-center w-full py-2' style={{borderBottom: '1px solid #D1D5DB'}}>
                      <div className='flex flex-row justify-center items-center'>
                        <span className='text-md font-semibold text-emerald-700'>{"Models"}</span>
                        {searchBrand.id>0 && <span className='text-xs bg-violet-200 text-violet-800 px-2 py-1 ml-3 rounded-lg font-bold'>{"Brand: "+searchBrand.description}</span>}
                      </div>
                      <IconButton onClick={()=>setOpenModel(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                    </div>
                    <div className='flex flex-row justify-start items-start w-full flex-wrap max-h-[600px] overflow-y-auto pt-2 xs:pt-5 pb-3'>
                      {models.map(val=>
                        <div key={val.id} className='flex flex-row justify-start items-center h-[40px] w-[90%] xs:w-[175px] sm:w-[175px] md:w-[220px] gap-2 py-3 px-1 mr-0 xs:mr-5 cursor-pointer hover:bg-slate-200' style={{borderRight: width>440?('1px solid #D1D5DB'):'none'}} onClick={()=>{setSearchModel({id: val.id, description: val.description, brandId: val.brandId, brandDescription: val.brandDescription});setOpenModel(false);}}>
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

export default ProductsSearch;