'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import { ArrowDropDown, CalendarMonth, CameraAlt, Close, FilterAlt, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const Home = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [statusLoading, setStatusLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { width, height=500 } = useWindowDimensions();
  const [scrollTop, setScrollTop] = useState(0);

  const [searchDescription, setSearchDescription] = useState("");
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    getData();
  }, []);

  async function getData(){
    setIsLoading(true);
    try{
      var error = false;
      if(!error){
        const response = await axios.post("/api/slides/active", {});
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
            heading: val.heading,
            sub_heading: val.sub_heading,
            content: val.content,
            v_position: val.v_position,
            h_position: val.h_position,
            image_url: imageUrl,
          });
        });
        setSlides(values);
      }
    }
    catch(error){
      setSlides([]);
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className='form_container mt-10' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <div className='form_fields_toolbar_container_center pb-3 mt-5' style={{borderBottom: '1px solid #e8e8e8'}}>
          <div className='form_fields_toolbar_container_center_search'>
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
              onClick={()=>{}}
              size='small'
              sx={{width: 110}}
            >Search</Button>
          </div>
        </div>
        <Carousel showThumbs={false}>
          {slides.map(val=>
            <div className='relative' key={val.id}>
              <img src={val.image_url} />
              <div className="bg-zinc-800 absolute bottom-10 right-2 opacity-60 flex flex-col justify-start items-start px-2 py-2 rounded w-full max-w-[400px]">
                <span className='text-white text-xl opacity-100 font-semibold'>{val.heading}</span>
                <span className='text-white text-sm opacity-100 mb-2'>{val.sub_heading}</span>
                <span className='text-white text-xs opacity-100 flex-wrap text-start'>{val.content}</span>
              </div>
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default Home;