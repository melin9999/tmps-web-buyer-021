'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import { ArrowDropDown, CalendarMonth, CameraAlt, Close, FilterAlt, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import HomeSlider from '@/components/sliders/HomeSlider';
import FeaturedProducts from '@/components/products/FeaturedProducts';

const Home = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [statusLoading, setStatusLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { width=500, height=500 } = useWindowDimensions();
  const [scrollTop, setScrollTop] = useState(0);

  const [searchDescription, setSearchDescription] = useState("");
  const [searchBrand, setSearchBrand] = useState({id: 0, description: "All"});
  const [searchModel, setSearchModel] = useState({id: 0, description: "All", brandId: 0, brandDescription: "All"});
  const [searchCategory, setSearchCategory] = useState({id: 0, description: "All"});
  const [openBrand, setOpenBrand] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <div className='form_container' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <HomeSlider />
        <div className='form_fields_toolbar_container_home mt-5 w-full' style={{borderBottom: '1px solid #e8e8e8'}}>
          <div className='form_fields_toolbar_container_home_left_1'>
            <div className='form_fields_toolbar_container_home_left_1_container'>
              <div className='form_text_field_constructed_home cursor-pointer'>
                <span className='form_text_field_constructed_label'>Category</span>
                <span className='form_text_field_constructed_text' onClick={()=>setOpenCategory(true)}>{searchCategory.description}</span>
                <div className='form_text_field_constructed_actions'>
                  <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchCategory({id: 0, description: "All"})}/>
                  <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenCategory(true)}/>
                </div>
              </div>
              <div className='form_text_field_constructed_home cursor-pointer'>
                <span className='form_text_field_constructed_label'>Brand</span>
                <span className='form_text_field_constructed_text' onClick={()=>setOpenBrand(true)}>{searchBrand.description}</span>
                <div className='form_text_field_constructed_actions'>
                  <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchBrand({id: 0, description: "All"})}/>
                  <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenBrand(true)}/>
                </div>
              </div>
              <div className='form_text_field_constructed_home cursor-pointer'>
                <span className='form_text_field_constructed_label'>Model</span>
                <span className='form_text_field_constructed_text' onClick={()=>setOpenModel(true)}>{searchModel.description}</span>
                <div className='form_text_field_constructed_actions'>
                  <Close sx={{width: 14, height: 14, color: '#6b7280'}} onClick={()=>setSearchModel({id: 0, description: "All", brandId: 0, brandDescription: "All"})}/>
                  <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenModel(true)}/>
                </div>
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
                disabled={isLoading} 
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
                disabled={isLoading} 
                style={{textTransform: 'none'}} 
                startIcon={isLoading?<CircularProgress size={18} style={{'color': '#9ca3af'}}/>:<Search />}
                onClick={()=>router.push('/products/search/'+searchDescription===""?"all":searchDescription)}
                size='small'
                sx={{width: 110}}
              >Search</Button>
            </div>
          </div>
        </div>
        <div className='py-5 bg-slate-200 w-full'>
          <div className='flex flex-row justify-between items-center w-full py-3 bg-white mb-3 px-2'>
            <span className='text-xl font-semibold text-emerald-700'>Featured</span>
            <Button 
              variant='contained' 
              style={{textTransform: 'none'}} 
              endIcon={<KeyboardArrowRight />}
              onClick={()=>router.push('/featured')}
              size='small'
              sx={{width: 110}}
            >Show All</Button>
          </div>
          <FeaturedProducts limit={20} width={width}/>
        </div>
      </div>
    </div>
  )
}

export default Home;