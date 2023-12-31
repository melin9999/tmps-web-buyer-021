'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import { Close, FilterAlt, GridView, KeyboardArrowLeft, KeyboardArrowRight, TableRowsOutlined } from '@mui/icons-material';
import { CircularProgress, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { useSearchContext } from '@/providers/SearchContextProvider';
import ProductsSearch from '@/components/toolbars/ProductsSearch';
import SearchProduct from '@/components/products/SearchProduct';
import SearchProductCompact from '@/components/products/SearchProductCompact';
import Navbar from '@/components/headers/Navbar';

const ProductsSearchView = ({params}) => {
  const router = useRouter();
  const {contextDescription} = useSearchContext();
  const {data: session, status} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { width=1152, height=500 } = useWindowDimensions();
  const [smallScreen, setSmallScreen] = useState(false);

  const categoryRef = useRef(null);
  const [filtersShowing, setFiltersShowing] = useState(false);

  const [itemWidth, setItemWidth] = useState(300);
  const [verticalMode, setVerticalMode] = useState(false);
  const [viewCompact, setViewCompact] = useState(true);

  const [searchRpp, setSearchRpp] = useState(30);
  const [searchRowCount, setSearchRowCount] = useState(0);
  const [searchNop, setSearchNop] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [searchSortBy, setSearchSortBy] = useState('description');
  const [searchOrder, setSearchOrder] = useState('ASC');
  const [searchPriceMin, setSearchPriceMin] = useState(0);
  const [searchPriceMax, setSearchPriceMax] = useState(0);
  const [searchCategory, setSearchCategory] = useState({id: 0, description: 'All', image_url: 'none'});
  const [searchModel, setSearchModel] = useState({id: 0, description: 'All', image_url: 'none'});
  const [searchSubCategory, setSearchSubCategory] = useState({id: 0, description: 'All', image_url: 'none'});
  const [searchBrand, setSearchBrand] = useState({id: 0, description: 'All', image_url: 'none'});
  const [searchSelectedBrands, setSearchSelectedBrands] = useState([]);
  const [searchSelectedFeatures, setSearchSelectedFeatures] = useState([]);

  useEffect(() => {
    console.log(params.query);
    if(params.query.category){
      //getCategory();
      //getSubCategory();
    }
    if(params.query.brand){
      //getBrand();
    }
    if(params.query.desciption){

    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    try {
      const search_data = localStorage.getItem('buyer_products_search_data');
      if(search_data!==null){
        setSearchData(JSON.parse(search_data));
      }
      const search_nop = localStorage.getItem('buyer_products_search_nop');
      if(search_nop!==null) {
        setSearchNop(JSON.parse(search_nop));
      }
      const search_page = localStorage.getItem('buyer_products_search_page');
      if(search_page!==null) {
        setSearchPage(JSON.parse(search_page));
      }
      const search_rpp = localStorage.getItem('buyer_products_search_rpp');
      if(search_rpp!==null) {
        setSearchRpp(JSON.parse(search_rpp));
      }
    } 
    catch(e) {
      console.log("get storage error - "+e);
    }
  }, []);

  useEffect(() => {
    if(searchData.length>0){
      const scroll_position = localStorage.getItem('buyer_products_search_scroll_position');
      if(scroll_position!==null) {
        window.scrollTo(0, parseInt(scroll_position));
        localStorage.removeItem('buyer_products_search_scroll_position');
      }
    }
  }, [searchData]);

  useEffect(() => {
    if(width>=1280){
      setItemWidth((1030/2)-30);
      setVerticalMode(false);
      setSmallScreen(false);
    }
    else if(width>=1024 && width<1280){
      setItemWidth(((width-250)/2)-30);
      setVerticalMode(false);
      setSmallScreen(false);
    }
    else if(width>=768 && width<1024){
      setItemWidth(((width-250))-40);
      setVerticalMode(false);
      setSmallScreen(false);
    }
    else if(width>=640 && width<768){
      setItemWidth((500));
      setVerticalMode(false);
      setSmallScreen(true);
    }
    else if(width>=370 && width<640){
      setItemWidth((width)-40);
      setVerticalMode(false);
      setSmallScreen(true);
    }
    else{
      setItemWidth(220);
      setVerticalMode(true);
      setSmallScreen(true);
    }
  }, [width]);  

  async function getSearchData(page){
    if(page>=1 && page<=searchNop){
      setIsLoading(true);
      setServerError(false);
      try{
        var error = false;
        var search_data = {};
        if (searchBrand.id !== 0) {
          search_data["brandId"] = (searchBrand.id);
        }
        if (searchModel.id !== 0) {
          search_data["modelId"] = (searchModel.id);
        }
        if (searchCategory.id !== 0) {
          search_data["categoryId"] = (searchCategory.id);
        }
        if (searchSubCategory.id !== 0) {
          search_data["subCategoryId"] = (searchSubCategory.id);
        }
        if (contextDescription.length>0) {
          search_data["description"] = contextDescription;
        }
        var features = [];
        searchSelectedFeatures.map(val=>{
          features.push(val.id);
        });
        search_data["brands"] = searchSelectedBrands;
        search_data["features"] = features;
        search_data["priceMin"] = parseFloat(searchPriceMin);
        search_data["priceMax"] = parseFloat(searchPriceMax);
        search_data["sortBy"] = searchSortBy;
        search_data["order"] = searchOrder;
        if(!error){
          const response = await axios.post("/api/inventory/search", {
            search_data: search_data,
            rpp: parseInt(""+searchRpp),
            page: page,
          });
          var index = 1;
          const values = [];
          response.data.data.data.map(val => {
            ++index;
            var imageUrl = "";
            if(val.image_url==="none"){
              imageUrl = "none";
            }
            else{
              imageUrl = "http://tm-web.effisoftsolutions.com/"+val.image_url;
            }
            var discountedPrice = val.price;
            if(val.discount>0){
              discountedPrice = val.price - ((val.price*val.discount)/100);
            }
            values.push({
              index: index,
              id: val.id,
              category_id: val.category_id,
              category_description: val.category.description,
              sub_category_id: val.sub_category_id,
              sub_category_description: val.sub_category.description,
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
          setSearchData(values);
          setSearchNop(response.data.data.nop);
          setSearchPage(page);
  
          try {
            localStorage.setItem('buyer_products_search_data', JSON.stringify(values));
            localStorage.setItem('buyer_products_search_nop', JSON.stringify(response.data.data.nop));
            localStorage.setItem('buyer_products_search_page', JSON.stringify(page));
            localStorage.setItem('buyer_products_search_rpp', JSON.stringify(searchRpp));
          } 
          catch (e) {
            console.log("put storage error");
          }
        }
      }
      catch(error){
        console.log(error);
      }
      finally{
        setIsLoading(false);
      }
    }
  };

  const selectValue = (val) => {
    try {
      localStorage.setItem('buyer_products_search_scroll_position', window.scrollY.toString());
      router.push(`/products/${val.id}/${val.heading}`);
    } 
    catch (e) {
      console.log("put storage error");
    }
  }

  const applyFilters = () => {
    getSearchData(1);
  }

  return (
    <>
      <Navbar search={true} applyFilters={applyFilters}/>
      <div className='form_container pt-[75px]'>
        <div className='form_container_xtra_large'>
          <div className='flex flex-row w-full justify-start md:justify-between items-start relative'>
            {((filtersShowing && smallScreen) || (!smallScreen)) && 
              <div className='flex flex-col justify-start items-center w-[250px] absolute md:static top-1 left-0 z-50 md:z-0 bg-white' style={smallScreen?{borderRight: '1px solid #e8e8e8'}:{borderRight: '1px solid #e8e8e8'}}>
                <span ref={categoryRef} className='w-[0px] h-[1px] absolute top-1 left-0'/>
                <div className='flex md:hidden flex-row justify-between items-center w-full py-2 px-2' style={{borderBottom: '1px solid #D1D5DB'}}>
                  <span></span>
                  <IconButton onClick={()=>setFiltersShowing(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
                </div>
                <ProductsSearch 
                  categoryRef={categoryRef} applyFilters={applyFilters} 
                  searchSortBy={searchSortBy} setSearchSortBy={setSearchSortBy}
                  searchOrder={searchOrder} setSearchOrder={setSearchOrder}
                  searchPriceMin={searchPriceMin} setSearchPriceMin={setSearchPriceMin}
                  searchPriceMax={searchPriceMax} setSearchPriceMax={setSearchPriceMax}
                  searchCategory={searchCategory} setSearchCategory={setSearchCategory}
                  searchSubCategory={searchSubCategory} setSearchSubCategory={setSearchSubCategory}
                  searchBrand={searchBrand} setSearchBrand={setSearchBrand}
                  searchModel={searchModel} setSearchModel={setSearchModel}
                  searchSelectedBrands={searchSelectedBrands} setSearchSelectedBrands={setSearchSelectedBrands}
                  searchSelectedFeatures={searchSelectedFeatures} setSearchSelectedFeatures={setSearchSelectedFeatures}
                />              
              </div>
            }
            <div className='flex flex-1 flex-col justify-start items-start pt-5 pb-5' style={{minHeight: (height-125)}}>
              <div className='form_fields_toolbar_container'>
                <div className='flex flex-row justify-start sm:justify-center items-center w-full sm:w-auto gap-2'>
                  <div className='flex md:hidden flex-row'>
                    <IconButton onClick={()=>setFiltersShowing(true)}><FilterAlt/></IconButton>
                  </div>
                  <IconButton onClick={()=>setViewCompact(val=>!val)}>{viewCompact?<TableRowsOutlined/>:<GridView/>}</IconButton>
                  <div className='flex flex-row justify-center items-center'>
                    {searchCategory.id>0 && searchSubCategory.id>0 &&
                      <span className='text-xs text-zinc-400'>{searchCategory.description+' -> '+searchSubCategory.description}</span>
                    }
                  </div>
                </div>
                <div className='flex flex-row justify-end sm:justify-center items-center w-full sm:w-auto gap-2'>
                  <TextField
                    className='bg-white w-[80px]'
                    id='rpp'
                    select={true}
                    value={searchRpp}
                    onChange={event=>setSearchRpp(event.target.value)} 
                    disabled={isLoading}
                    label='Rows'
                    size='small'
                    inputProps={{style: {fontSize: 13}}}
                    SelectProps={{style: {fontSize: 13}}}
                    InputLabelProps={{style: {fontSize: 15}}}
                  >
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </TextField>
                  {searchRpp!==0 &&
                    <div className='flex flex-row justify-center items-center gap-3'>
                      <IconButton aria-label="delete" size="small" onClick={()=>getSearchData(searchPage-1)}>
                        <KeyboardArrowLeft size={20} />
                      </IconButton>
                      <Typography sx={{fontSize: 12, color: "#444"}}>{`Page ${searchPage} of ${searchNop}`}</Typography>
                      <IconButton aria-label="delete" size="small" onClick={()=>getSearchData(searchPage+1)}>
                        <KeyboardArrowRight size={20} />
                      </IconButton>
                    </div>
                  }
                </div>
              </div>
              <div className='flex flex-row w-full justify-center items-center'>
                {isLoading?
                  <div className='flex flex-col items-center justify-center w-full h-[400px] lg:h-[300px] sm:h-[300px] xs:h-[300px] mb-10'>
                    <CircularProgress size={30} style={{color:"#71717a"}} />
                  </div>:
                  <div className='flex flex-row justify-center md:justify-between items-center flex-wrap gap-5 pl-3 pr-3 xl:pr-0'>
                    {searchData.map((val)=>
                      <>
                        {viewCompact?
                          <SearchProductCompact key={val.id+val.heading} val={val} selectValue={selectValue}/>
                        :
                          <SearchProduct key={val.id+val.heading} val={val} itemWidth={itemWidth} vertical={verticalMode} selectValue={selectValue}/>
                        }
                      </>                    
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsSearchView;