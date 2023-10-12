import { useEffect, useState } from 'react';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import Slider from 'react-slick';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FeaturedCategory from './FeaturedCategory';

function SampleNextArrow(props) {
  const { onClick } = props;
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

  var settings = {
    autoplay: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    dots: false,
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
      setItemWidth((1100/6)-20);
      setNumberOfSlides(6);
      setSlidesToScroll(5);
    }
    else if(width>=1024 && width<1152){
      setItemWidth((width/5)-20);
      setNumberOfSlides(5);
      setSlidesToScroll(4);
    }
    else if(width>=640 && width<1024){
      setItemWidth((width/4)-20);
      setNumberOfSlides(4);
      setSlidesToScroll(3);
    }
    else if(width>=440 && width<640){
      setItemWidth((width/3)-20);
      setNumberOfSlides(3);
      setSlidesToScroll(2);
    }
    else if(width>=340 && width<440){
      setItemWidth((width/2)-20);
      setNumberOfSlides(2);
      setSlidesToScroll(1);
    }
    else{
      setItemWidth((200));
      setNumberOfSlides(1);
      setSlidesToScroll(1);
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
        var data = response.data.data;
        data.map(val => {
          ++index;
          var imageUrl = "";
          if(val.part_category.image_url==="none"){
            imageUrl = "none";
          }
          else{
            imageUrl = "http://localhost:8000/"+val.part_category.image_url;
          }
          values.push({
            index: index,
            id: val.part_category.id,
            description: val.part_category.description,
            image_url: imageUrl,
            count: val.count,
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
    <div className='bg-white relative pt-3' style={{width: width>=1152?1152:(width-15)}}>
      {isLoading?
        <div className='flex flex-col items-center justify-center w-full h-[200px] lg:h-[150px] sm:h-[150px] xs:h-[150px] bg-white'>
          <CircularProgress size={30} style={{color:"#71717a"}} />
          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
        </div>:
        <Slider {...settings}>
          {featured.map((val)=>
            <FeaturedCategory key={val.id} val={val} itemWidth={itemWidth}/>
          )}
        </Slider>
      }
    </div>
  )
}

export default FeaturedCategories;