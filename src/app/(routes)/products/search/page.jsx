'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import { ArrowDropDown, CalendarMonth, Close, ExpandMore, Filter, FilterAlt, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, InputAdornment, MenuItem, Slider, TextField, Typography } from '@mui/material';
import HomeSearch from '@/components/toolbars/HomeSearch';
import { useSearchContext } from '@/providers/SearchContextProvider';
import Image from 'next/image';
import ProductsSearch from '@/components/toolbars/ProductsSearch';

const ProductSearch = () => {
  const router = useRouter();
  const {contextDescription, setContextDescription, contextBrand, setContextBrand, contextModel, setContextModel, contextCategory, setContextCategory} = useSearchContext();
  const {data: session, status} = useSession();
  const [statusLoading, setStatusLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { width=1152, height=500 } = useWindowDimensions();
  const scrollRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const [smallScreen, setSmallScreen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(0);
  const [filtersShowing, setFiltersShowing] = useState(false);
  const [searchDescription, setSearchDescription] = useState(contextDescription);
  const [searchSortBy, setSearchSortBy] = useState("id");
  const [searchOrder, setSearchOrder] = useState("ASC");

  const [searchRpp, setSearchRpp] = useState(30);
  const [searchRowCount, setSearchRowCount] = useState(0);
  const [searchNop, setSearchNop] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [searchBrand, setSearchBrand] = useState(contextBrand);
  const [searchModel, setSearchModel] = useState(contextModel);
  const [searchCategory, setSearchCategory] = useState(contextCategory);

  const [editItemFeatures, setEditItemFeatures] = useState([]);

  useEffect(() => {
    if(width>=1024){
      setSmallScreen(false);
    }
    else{
      setSmallScreen(true);
    }
  }, [width]);  
  
  const searchClicked = () => {
    setContextDescription(searchDescription);
    setContextBrand(searchBrand);
    setContextModel(searchModel);
    setContextCategory(searchCategory);
  }

  return (
    <div className='form_container pt-10' style={{minHeight: (height-125)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-125)}}>
        <div className='flex flex-row w-full justify-start lg:justify-between items-start relative' style={{minHeight: (height-125)}}>
          {((filtersShowing && smallScreen) || (!smallScreen)) && 
            <div className='flex flex-col w-[250px] min-h-[300px] absolute lg:static top-0 left-0 z-50 lg:z-0 bg-white' style={smallScreen?{borderRight: '1px solid #e8e8e8', minHeight: (height-125)}:{borderRight: '1px solid #e8e8e8', minHeight: (height-125)}}>
              <div className='flex lg:hidden flex-row justify-between items-center w-full py-2 px-2' style={{borderBottom: '1px solid #D1D5DB'}}>
                <span></span>
                <IconButton onClick={()=>setFiltersShowing(false)} sx={{width: 30, height: 30, borderRadius: 15, color: '#fff', backgroundColor: '#9CA3AF'}}><Close sx={{width: 20, height: 20, color: '#ffffff'}}/></IconButton>
              </div>
              <ProductsSearch searchCategory={searchCategory} setSearchCategory={setSearchCategory} 
                searchBrand={searchBrand} setSearchBrand={setSearchBrand} searchModel={searchModel} 
                setSearchModel={setSearchModel} searchSortBy={searchSortBy} setSearchSortBy={setSearchSortBy} 
                searchOrder={searchOrder} setSearchOrder={setSearchOrder} 
                editItemFeatures={editItemFeatures} setEditItemFeatures={setEditItemFeatures} width={width}/>              
            </div>
          }
          <div className='flex flex-1 flex-col justify-start items-start pt-5' style={{minHeight: (height-125)}}>
            <div className='form_fields_toolbar_container'>
              <div className='form_fields_toolbar_container_left'>
                <div className='flex lg:hidden flex-row'>
                  <IconButton onClick={()=>setFiltersShowing(true)}><FilterAlt/></IconButton>
                </div>
                <TextField 
                  id='description'
                  label="Search" 
                  variant="outlined" 
                  className='form_text_field' 
                  value={searchDescription} 
                  onChange={event=>setSearchDescription(event.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Search sx={{width: 26, height: 26, color: '#94a3b8'}}/></InputAdornment>,
                  }}
                  size='small' 
                  inputProps={{style: {fontSize: 13}}}
                  SelectProps={{style: {fontSize: 13}}}
                  InputLabelProps={{style: {fontSize: 15}}}
                  sx={{maxWidth: 410}}
                />
              </div>
              <div className='form_fields_toolbar_container_right'>
                <TextField
                  className='form_text_field_xtra_xtra_small'
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
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </TextField>
                {searchRpp!==0 &&
                  <div className='flex flex-row justify-center items-center w-[140px]'>
                    <IconButton aria-label="delete" size="small" onClick={()=>getSearchData(searchPage-1)}>
                      <KeyboardArrowLeft size={20} />
                    </IconButton>
                    <Typography sx={{fontSize: 12, color: "#444"}}>{`Page ${searchPage} of ${searchNop}`}</Typography>
                    <IconButton aria-label="delete" size="small" onClick={()=>getSearchData(searchPage+1)}>
                      <KeyboardArrowRight size={20} />
                    </IconButton>
                  </div>
                }
                <Button 
                  variant='contained' 
                  style={{textTransform: 'none'}} 
                  startIcon={<Search />}
                  onClick={searchClicked}
                  size='small'
                  sx={{width: 120}}
                >Search</Button>
              </div>
            </div>
            <div className='flex flex-row w-full justify-center items-center'>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSearch;