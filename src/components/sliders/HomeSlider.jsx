'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CircularProgress } from '@mui/material';

const HomeSlider = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const { width=500, height=200 } = useWindowDimensions();
  const [slides, setSlides] = useState([]);
  var settings = {
    dots: true,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    centerMode: true,
  };

  useEffect(() => {
    getSlides();
  }, []);

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

  return (
    <div className='bg-yellow-200 px-10 w-full max-w-6xl'>
      {isLoading?
        <div className='flex flex-col items-center justify-center w-full bg-zinc-300'>
          <CircularProgress size={30} style={{color:"#71717a"}} />
          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
        </div>:
        <Slider {...settings}>
          <div>
            <img src="http://placekitten.com/g/400/200" style={{margin: 'auto'}}/>
            <span>sdfsdfsdf</span>
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
        </Slider>
      }
    </div>
  )
}

export default HomeSlider;