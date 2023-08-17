'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useWindowDimensions from '@/hooks/useWindowDimension';
import { KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import HomeSlider from '@/components/sliders/HomeSlider';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import HomeSearch from '@/components/toolbars/HomeSearch';

const Home = () => {
  const router = useRouter();
  const { width=500, height=500 } = useWindowDimensions();
  const [scrollTop, setScrollTop] = useState(0);

  const [searchDescription, setSearchDescription] = useState("");
  const [searchBrand, setSearchBrand] = useState({id: 0, description: "All"});
  const [searchModel, setSearchModel] = useState({id: 0, description: "All", brandId: 0, brandDescription: "All"});
  const [searchCategory, setSearchCategory] = useState({id: 0, description: "All"});

  const searchClicked = () => {
    router.push('/products/search/dddddd/')
  }

  useEffect(() => {
    /* console.log("Description :"+searchDescription);
    console.log("Brand :"+searchBrand.description);
    console.log("Model :"+searchModel.description);
    console.log("Category :"+searchCategory.description); */
  }, [searchDescription, searchBrand, searchModel, searchCategory]);
  

  return (
    <div className='form_container' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <HomeSlider width={width}/>
        <HomeSearch searchCategory={searchCategory} setSearchCategory={setSearchCategory} 
          searchBrand={searchBrand} setSearchBrand={setSearchBrand} searchModel={searchModel} 
          setSearchModel={setSearchModel} searchDescription={searchDescription} 
          setSearchDescription={setSearchDescription} searchClicked={searchClicked} width={width}/>
        <div className='py-5 bg-slate-200 w-full'>
          <div className='flex flex-row justify-between items-center w-full py-3 bg-white mb-3 px-2'>
            <span className='text-xl font-semibold text-emerald-700'>Featured</span>
            <Button 
              variant='text' 
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