'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import useWindowDimensions from '@/hooks/useWindowDimension';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import HomeSlider from '@/components/sliders/HomeSlider';
import HomeSearch from '@/components/toolbars/HomeSearch';
import FeaturedCategories from '@/components/categories/FeaturedCategories';
import FeaturedBrands from '@/components/brands/FeaturedBrands';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import axios from 'axios';
import HomeBannerLarge from '@/components/banners/HomeBannerLarge';
import HomeBannerSmall from '@/components/banners/HomeBannerSmall';
import { useSearchContext } from '@/providers/SearchContextProvider';

const Home = () => {
  const router = useRouter();
  const {setContextDescription, setContextBrand, setContextModel, setContextCategory} = useSearchContext();
  const { width=1152, height=500 } = useWindowDimensions();
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [banners, setBanners] = useState([]);
  const [limit, setLimit] = useState(9);
  const [searchDescription, setSearchDescription] = useState("");
  const [searchBrand, setSearchBrand] = useState({id: 0, description: "All"});
  const [searchModel, setSearchModel] = useState({id: 0, description: "All", brandId: 0, brandDescription: "All"});
  const [searchCategory, setSearchCategory] = useState({id: 0, description: "All"});

  useEffect(() => {
    setIsLoading1(false);
    setIsLoading2(false);
    getBanners();
    setContextDescription("");
    setContextBrand({id: 0, description: "All"});
    setContextModel({id: 0, description: "All", brandId: 0, brandDescription: "All"});
    setContextCategory({id: 0, description: "All"});
  }, []);

  const searchClicked = () => {
    setContextDescription(searchDescription);
    setContextBrand(searchBrand);
    setContextModel(searchModel);
    setContextCategory(searchCategory);
    router.push(`/products/search`);
  }

  async function getBanners(){
    setServerError(false);
    setIsLoading1(true);
    try{
      var error = false;
      if(!error){
        const response = await axios.post("/api/featured/banners/active", {});
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
          }var position = {};
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
          var linkStyles = {
            link_background_color: val.link_background_color,
            link_text_color: val.link_text_color,
          };
          values.push({
            index: index,
            id: val.id,
            position: position,
            styles: styles,
            linkStyles: linkStyles,
            content: val.content,
            description: val.description,
            heading: val.heading,
            sub_heading: val.sub_heading,
            link: val.link,
            link_only: val.link_only,
            show_caption: val.show_caption,
            size: val.size,
            status: val.status,
            image_url: imageUrl,
          });
        });
        setBanners(values);
      }
    }
    catch(error){
      setServerError(true);
    }
    finally{
      setIsLoading1(false);
    }
  }

  useEffect(() => {
    if(width>=1152){
      setLimit(9);
    }
    else if(width>=1024 && width<1152){
      setLimit(9);
    }
    else if(width>=700 && width<1024){
      setLimit(6);
    }
    else{
      setLimit(3);
    }
  }, [width]);

  useEffect(() => {
    /* console.log("Description :"+searchDescription);
    console.log("Brand :"+searchBrand.description);
    console.log("Model :"+searchModel.description);
    console.log("Category :"+searchCategory.description); */
  }, [searchDescription, searchBrand, searchModel, searchCategory]);

  useEffect(() => {
    //console.log(banners);
    /* console.log("Brand :"+searchBrand.description);
    console.log("Model :"+searchModel.description);
    console.log("Category :"+searchCategory.description); */
  }, [banners]);
  

  return (
    <div className='form_container' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <HomeSlider width={width}/>
        <div className='flex flex-row w-full justify-center items-center' style={{borderBottom: '1px solid #e8e8e8'}}>
          <div className='flex flex-1'>
            <HomeSearch searchCategory={searchCategory} setSearchCategory={setSearchCategory} 
              searchBrand={searchBrand} setSearchBrand={setSearchBrand} searchModel={searchModel} 
              setSearchModel={setSearchModel} searchDescription={searchDescription} 
              setSearchDescription={setSearchDescription} searchClicked={searchClicked} width={width}/>
          </div>
        </div>
        <div className='bg-white w-full mt-5'>
          <div className='flex flex-row justify-between items-center w-full py-2 bg-white px-1 xs:px-2'>
            <span className='text-sm xs:text-md md:text-xl font-semibold text-emerald-700'>Categories</span>
            <span></span>
          </div>
          <FeaturedCategories limit={20} width={width}/>
        </div>
        
        <div className='bg-white w-full mt-5 mb-5'>
          <div className='flex flex-row justify-between items-center w-full py-2 bg-white px-1 xs:px-2'>
            <span className='text-sm xs:text-md md:text-xl font-semibold text-emerald-700'>Featured</span>
            <Button 
              variant='text' 
              style={{textTransform: 'none'}} 
              endIcon={<KeyboardArrowRight />}
              onClick={()=>router.push('/featured')}
              size='small'
              sx={{width: 110}}
            >Show All</Button>
          </div>
          <FeaturedProducts limit={limit} width={width}/>
        </div>

        {banners.length>0 &&
          <HomeBannerLarge width={width} banner={banners[0]}/>
        }

        <div className='bg-white w-full mt-5 mb-5'>
          <div className='flex flex-row justify-between items-center w-full py-2 bg-white px-1 xs:px-2'>
            <span className='text-sm xs:text-md md:text-xl font-semibold text-emerald-700'>Top Brands</span>
            <Button 
              variant='text' 
              style={{textTransform: 'none'}} 
              endIcon={<KeyboardArrowRight />}
              onClick={()=>router.push('/featured')}
              size='small'
              sx={{width: 110}}
            >Show All</Button>
          </div>
          <FeaturedBrands limit={20} width={width}/>
        </div>

        {banners.length>1 &&
          <HomeBannerSmall width={width} banner={banners[1]}/>
        }

      </div>
    </div>
  )
}

export default Home;