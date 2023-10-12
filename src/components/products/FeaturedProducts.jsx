import { useEffect, useState } from 'react';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import FeaturedProduct from './FeaturedProduct';

const FeaturedProducts = ({width, limit}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [featured, setFeatured] = useState([]);
  const [itemWidth, setItemWidth] = useState(300);
  const [verticalMode, setVerticalMode] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(width>=1152){
      setItemWidth((1100/3)-10);
      setVerticalMode(false);
    }
    else if(width>=1024 && width<1152){
      setItemWidth((width/3)-20);
      setVerticalMode(false);
    }
    else if(width>=700 && width<1024){
      setItemWidth((width/2)-40);
      setVerticalMode(false);
    }
    else if(width>=440 && width<700){
      setItemWidth(400);
      setVerticalMode(false);
    }
    else if(width>=340 && width<440){
      setItemWidth((width)-30);
      setVerticalMode(false);
    }
    else{
      setItemWidth((width)-40);
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
            imageUrl = "http://localhost:8000/"+val.image_url;
          }
          var discountedPrice = val.price;
          if(val.discount>0){
            discountedPrice = val.price - ((val.price*val.discount)/100);
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
    <div className='relative py-3' style={{width: width>=1152?1140:(width-20), marginLeft: -3, marginRight: -2, paddingLeft: -5, paddingRight: -5, overflow: 'hidden'}}>
      {isLoading?
        <div className='flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px] sm:h-[250px] xs:h-[150px] bg-white'>
          <CircularProgress size={30} style={{color:"#71717a"}} />
          <span className="text-sm mt-5 font-semibold text-gray-700">Loading...</span>
        </div>:
        <div className='flex flex-row justify-center items-center flex-wrap gap-5'>
          {featured.map((val)=>
            <FeaturedProduct key={val.id} val={val} itemWidth={itemWidth} vertical={verticalMode}/>
          )}
        </div>
      }
    </div>
  )
}

export default FeaturedProducts;