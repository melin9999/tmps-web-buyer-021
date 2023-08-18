'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, CircularProgress } from '@mui/material';

function SampleNextArrow(props) {
  const { className, style, onClick, width } = props;
  return (
    <div
      className={className}
      style={{...style, position: 'absolute', top: width>=768?'50%':'25%', right: 7, zIndex: 50}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, width } = props;
  return (
    <div
      className={className}
      style={{...style, position: 'absolute', top: width>=768?'50%':'25%', left: 7, zIndex: 50}}
      onClick={onClick}
    />
  );
}

const HomeSlider = ({width}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [slides, setSlides] = useState([]);
  var settings = {
    dots: true,
    fade: true,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    
    nextArrow: <SampleNextArrow width={width} />,
    prevArrow: <SamplePrevArrow width={width} />,
    dots: false,
  };

  useEffect(() => {
    getSlides();
  }, []);

  async function getSlides(){
    try{
      setServerError(false);
      setIsLoading(true);
      var error = false;
      if(!error){
        const response = await axios.post("/api/supportdata/slides/", {});
        const values = [];
        response.data.data.rows.map(val => {
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "https://tm-web.techmax.lk/"+val.image_url;
          }
          var position = {};
          if(val.position=="top_start"){
            position = {
              position: 'absolute',
              top: val.v_position,
              left: val.h_position,
              zIndex: 50,
              backgroundColor: val.background_color,
              backgroundOpacity: val.background_opacity,
            };
          }
          if(val.position=="top_end"){
            position = {
              position: 'absolute',
              top: val.v_position,
              right: val.h_position,
              zIndex: 50,
              backgroundColor: val.background_color,
              backgroundOpacity: val.background_opacity,
            };
          }
          if(val.position=="bottom_start"){
            position = {
              position: 'absolute',
              bottom: val.v_position,
              left: val.h_position,
              zIndex: 50,
              backgroundColor: val.background_color,
              backgroundOpacity: val.background_opacity,
            };
          }
          if(val.position=="bottom_end"){
            position = {
              position: 'absolute',
              bottom: val.v_position,
              right: val.h_position,
              zIndex: 50,
              backgroundColor: val.background_color,
              backgroundOpacity: val.background_opacity,
            };
          }
          var styles = {
            headingColor: val.heading_color,
            subHeadingColor: val.sub_heading_color,
            contentColor: val.content_color,
          };
          values.push({
            id: val.id,
            description: val.description,
            heading: val.heading,
            sub_heading: val.sub_heading,
            content: val.content,
            position: position,
            styles: styles,
            v_position: val.v_position,
            h_position: val.h_position,
            image_url: imageUrl,
          });
        });
        setSlides(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full max-w-6xl bg-slate-200 py-0 relative'>
      {isLoading?
        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-slate-200'>
          <CircularProgress size={30} style={{color:"#71717a"}} />
          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
        </div>:
        <Slider {...settings}>
          {slides.map(val=>
            <div key={val.id} className='flex flex-col justify-center items-center relative my-0'>
              <img src={val.image_url} style={{margin: 0, width: width>1152?(1152):(width)}}/>
              <div className='flex flex-col w-full lg:max-w-[600px] lg:opacity-70 px-2 py-2' style={width<1024?{backgroundColor: val.position.backgroundColor}:val.position}>
                <span className='opacity-100 font-bold text-sm h-[20px] overflow-hidden' style={{color: val.styles.headingColor}}>{val.heading}</span>
                {val.sub_heading===""?
                  <span className='mb-2 h-[20px]' style={{borderBottom: '1px solid #D1D5DB'}}></span>:
                  <span className='opacity-100 font-bold text-xs mb-2 h-[20px] overflow-hidden' style={{color: val.styles.subHeadingColor, borderBottom: '1px solid #D1D5DB'}}>{val.sub_heading}</span>
                }
                <span className='flex opacity-100 font-bold text-[12px] h-[57px] text-justify overflow-hidden' style={{color: val.styles.contentColor}}>{val.content}</span>
                {val.link!=="" && 
                  <div className='flex flex-row justify-end items-center mt-3'>
                    <Button size='small' variant='outlined' onClick={()=>router.push(val.link)}>{"Learn More..."}</Button>
                  </div>
                }
              </div>
            </div>
          )}
        </Slider>
      }
    </div>
  )
}

export default HomeSlider;