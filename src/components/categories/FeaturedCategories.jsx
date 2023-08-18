import { useEffect, useState } from 'react';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import Slider from 'react-slick';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FeaturedCategory from './FeaturedCategory';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className='flex flex-col justify-center items-center w-[24px] h-[24px] rounded-[12px] bg-gray-300 opacity-50 cursor-pointer' onClick={onClick} style={{position: 'absolute', top: '50%', right: 12, zIndex: 20}}>
      <KeyboardArrowRight/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className='flex flex-col justify-center items-center w-[24px] h-[24px] rounded-[12px] bg-gray-300 opacity-50 cursor-pointer' onClick={onClick} style={{position: 'absolute', top: '50%', left: 12, zIndex: 20}}>
      <KeyboardArrowLeft/>
    </div>
  );
}

const FeaturedCategories = ({width, limit}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [featured, setFeatured] = useState([]);
  const [itemWidth, setItemWidth] = useState(250);
  const [numberOfSlides, setNumberOfSlides] = useState(5);
  const [slidesToScroll, setSlidesToScroll] = useState(5);
  const [verticalMode, setVerticalMode] = useState(false);

  var settings = {
    autoplay: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    dots: false,
    vertical: verticalMode,
    verticalSwiping: verticalMode,
    slidesToShow: numberOfSlides,
    slidesToScroll: slidesToScroll,
    infinite: true,
    speed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(width>=1152){
      setItemWidth((1100/5));
      setNumberOfSlides(5);
      setSlidesToScroll(3);
      setVerticalMode(false);
    }
    else if(width>=1024 && width<1152){
      setItemWidth((width/4)-15);
      setNumberOfSlides(4);
      setSlidesToScroll(2);
      setVerticalMode(false);
    }
    else if(width>=640 && width<1024){
      setItemWidth((width/3)-15);
      setNumberOfSlides(3);
      setSlidesToScroll(1);
      setVerticalMode(false);
    }
    else if(width>=440 && width<640){
      setItemWidth((width-20));
      setNumberOfSlides(3);
      setSlidesToScroll(2);
      setVerticalMode(true);
    }
    else{
      setItemWidth((width-20));
      setNumberOfSlides(3);
      setSlidesToScroll(2);
      setVerticalMode(true);
    }
    getFeatured();
  }, [width]);

  async function getFeatured(){
    setServerError(false);
    setIsLoading(true);
    try{
      var error = false;
      if(!error){
        const response = await axios.post("/api/featured/categories", {
          limit: limit,
        });
        const values = [];
        var index = 0;
        var data = response.data.data.rows;
        data.map(val => {
          ++index;
          var imageUrl = "";
          if(val.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "https://tm-web.techmax.lk/"+val.image_url;
          }
          var last = false;
          if((index%numberOfSlides)===0){
            last = true;
          }
          values.push({
            index: index,
            id: val.id,
            code: val.code,
            description: val.description,
            status: val.status,
            image_url: imageUrl,
            last: last,
          });
        });
        setFeatured(values);
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
    <div className='bg-slate-200 relative pt-3' style={{width: width>=1152?1140:(width-20), marginLeft: -3, marginRight: -2, paddingLeft: -5, paddingRight: -5, overflow: 'hidden'}}>
      {isLoading?
        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-white'>
          <CircularProgress size={30} style={{color:"#71717a"}} />
          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
        </div>:
        <Slider {...settings}>
          {featured.map((val)=>
            <FeaturedCategory key={val.id} val={val} itemWidth={itemWidth} vertical={verticalMode}/>
          )}
        </Slider>
      }
    </div>
  )
}

export default FeaturedCategories;