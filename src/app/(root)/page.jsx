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
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    getSlides();
    getFeatured();
  }, []);

  useEffect(() => {
    console.log(featured);
  }, [featured]);

  async function getSlides(){
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

  async function getFeatured(){
    setIsLoading(true);
    try{
      var error = false;
      if(!error){
        const response = await axios.post("/api/inventory/featured", {});
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
            part_category_id: val.part_category_id,
            part_category_id: val.part_category.description,
            brand_id: val.brand_id,
            brand_description: val.brand.description,
            model_id: val.model_id,
            model_description: val.model.description,
            code: val.code,
            heading: val.heading,
            short_description: val.short_description,
            description: val.description,
            price: val.price,
            discount: val.discount,
            quantity_discount_amount: val.quantity_discount_amount,
            quantity_discount: val.quantity_discount,
            quantity_free_issue_amount: val.quantity_free_issue_amount,
            quantity_free_issue: val.quantity_free_issue,
            order_total_discount_amount: val.order_total_discount_amount,
            order_total_discount: val.order_total_discount,
            free_shipping: val.free_shipping,
            featured: val.featured,
            status: val.status,
            image_url: imageUrl,
          });
        });
        setFeatured(values);
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
    <div className='form_container' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <Carousel showThumbs={false}>
          {slides.map(val=>
            <div className='relative' key={val.id} style={{height: 300}}>
              <img src={val.image_url} />
              <div className="bg-zinc-800 absolute bottom-10 right-2 opacity-60 flex flex-col justify-start items-start px-2 py-2 rounded w-full max-w-[400px]">
                <span className='text-white text-xl opacity-100 font-semibold'>{val.heading}</span>
                <span className='text-white text-sm opacity-100 mb-2'>{val.sub_heading}</span>
                <span className='text-white text-xs opacity-100 flex-wrap text-start'>{val.content}</span>
              </div>
            </div>
          )}
        </Carousel>
        <div className='form_fields_toolbar_container_center pb-10 pt-10' style={{borderBottom: '1px solid #e8e8e8'}}>
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
              onClick={()=>router.push('/products/search/'+searchDescription===""?"all":searchDescription)}
              size='small'
              sx={{width: 110}}
            >Search</Button>
          </div>
        </div>
        <div className='mt-10 mb-5'>
          <span className='text-xl font-semibold text-emerald-700'>Featured</span>
        </div>
        <div className='flex flex-row w-full justify-center items-center gap-5 flex-wrap'>
          {featured.map(val=>
            <div className='flex flex-col justify-center items-center bg-white w-[250px]' style={{border: '1px solid #a7f3d0', borderRadius: 5}} key={val.id}>
              <span className='flex flex-col w-full text-xs opacity-100 font-semibold break-words h-[50px] py-2 overflow-hidden px-2'>{val.heading}</span>
              <div className='flex justify-center items-center relative w-[200px] h-[200px] mb-1'>
                {val.image_url==="none"?<CameraAlt sx={{width: 90, height: 90, color: '#cbd5e1'}}/>:
                <Image src={val.image_url} alt="product image" fill sizes='300px' priority={true} style={{objectFit: 'cover'}}/>}
              </div>
              <span className='flex flex-col w-full text-xs opacity-100 font-semibold break-words h-[50px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #a7f3d0', borderBottomRadius: 5}}>{val.short_description}</span>
              <div className='flex flex-row justify-start items-center w-full px-2 gap-1 flex-wrap py-1 h-[50px] overflow-hidden' style={{borderBottom: '1px solid #a7f3d0', borderBottomRadius: 5}}>
                {val.featured==="yes"&&<span className='flex flex-col py-1 px-2 bg-yellow-200 text-yellow-800 rounded text-[9px] font-semibold'>Featured</span>}
                {val.free_shipping==="yes"&&<span className='flex flex-col py-1 px-2 bg-purple-200 text-purple-800 rounded text-[9px] font-semibold'>Free Shipping</span>}
                {val.quantity_discount_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-semibold'>{`Buy ${val.quantity_discount_amount} to get ${val.quantity_discount}% off!`}</span>}
                {val.quantity_free_issue_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-semibold'>{`Buy ${val.quantity_free_issue_amount} to get ${val.quantity_free_issue} free!`}</span>}
                {val.order_total_discount_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-semibold'>{`${val.order_total_discount}% off for orders more than Rs. ${parseFloat(val.order_total_discount_amount).toFixed(2)}!`}</span>}
              </div>
              <div className='flex flex-row justify-between items-center w-full px-2 my-2'>
                <div className='flex flex-row justify-between items-center w-[110px] bg-blue-100 p-2' style={{border: '1px solid #3b82f6', borderRadius: 5}}>
                  <span className='font-semibold text-xs'>{"Rs."}</span>
                  <span className='text-xs font-semibold'>{parseFloat(val.price).toFixed(2)}</span>
                </div>
                {parseFloat(val.discount)>0.0?
                  <div className='flex flex-row justify-between items-center w-[70px] bg-rose-200 p-2' style={{border: '1px solid #fb7185', borderRadius: 5}}>
                    <span className='text-xs font-semibold w-full text-right'>{val.discount+"% off"}</span>
                  </div>:
                  <div></div>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home;