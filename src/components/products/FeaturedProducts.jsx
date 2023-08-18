import { useEffect, useState } from 'react';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import Slider from 'react-slick';
import FeaturedProduct from './FeaturedProduct';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

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

const FeaturedProducts = ({width, limit}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [featured, setFeatured] = useState([]);
  const [itemWidth, setItemWidth] = useState(250);
  const [numberOfSlides, setNumberOfSlides] = useState(5);
  const [slidesToScroll, setSlidesToScroll] = useState(5);
  const [verticalMode, setVerticalMode] = useState(false);

  var settings = {
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    dots: false,
    vertical: verticalMode,
    verticalSwiping: verticalMode,
    slidesToShow: numberOfSlides,
    slidesToScroll: slidesToScroll,
    infinite: true,
    speed: 5000,
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
        const response = await axios.post("/api/featured/products", {
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
          var discountedPrice = val.price;
          if(val.discount>0){
            discountedPrice = val.price - ((val.price*val.discount)/100);
          }
          var last = false;
          if((index%numberOfSlides)===0){
            last = true;
          }
          values.push({
            index: index,
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
            discounted_price: discountedPrice,
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
    <div className='bg-slate-200 relative' style={{width: width>=1152?1140:(width-20), marginLeft: -3, marginRight: -2, paddingLeft: -5, paddingRight: -5, overflow: 'hidden'}}>
      {isLoading?
        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-white'>
          <CircularProgress size={30} style={{color:"#71717a"}} />
          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
        </div>:
        <Slider {...settings}>
          {featured.map((val)=>
            <FeaturedProduct key={val.id} val={val} itemWidth={itemWidth} vertical={verticalMode}/>
          )}
        </Slider>
      }
    </div>
  )
}

export default FeaturedProducts;