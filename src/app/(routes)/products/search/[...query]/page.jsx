'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import { ArrowDropDown, CalendarMonth, Close, FilterAlt, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import HomeSearch from '@/components/toolbars/HomeSearch';

const ProductSearch = ({params}) => {
  const router = useRouter();
  const {data: session, status} = useSession();
  const [statusLoading, setStatusLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { width, height=500 } = useWindowDimensions();
  const scrollRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  const [selectedRow, setSelectedRow] = useState(0);
  const [filtersShowing, setFiltersShowing] = useState(false);
  const [searchDescription, setSearchDescription] = useState(params.query);
  const [searchStatus, setSearchStatus] = useState("active");
  const [searchSortBy, setSearchSortBy] = useState("id");
  const [searchOrder, setSearchOrder] = useState("ASC");

  const [searchRpp, setSearchRpp] = useState(30);
  const [searchRowCount, setSearchRowCount] = useState(0);
  const [searchNop, setSearchNop] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const [searchBrand, setSearchBrand] = useState({id: 0, description: "All"});
  const [searchModel, setSearchModel] = useState({id: 0, description: "All", brandId: 0, brandDescription: "All"});
  const [searchCategory, setSearchCategory] = useState({id: 0, description: "All"});
  const [openBrand, setOpenBrand] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    console.log(params);
  }, [params])
  
  const searchClicked = () => {}

  return (
    <div className='form_container' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <HomeSearch searchCategory={searchCategory} setSearchCategory={setSearchCategory} 
          searchBrand={searchBrand} setSearchBrand={setSearchBrand} searchModel={searchModel} 
          setSearchModel={setSearchModel} searchDescription={searchDescription} 
          setSearchDescription={setSearchDescription} searchClicked={searchClicked} width={width}/>
        {filtersShowing && 
          <div className='form_fields_toolbar_container_home pb-3 mt-1' style={{borderBottom: '1px solid #e8e8e8'}}>
            
          </div>
        }
      </div>
    </div>
  )
}

export default ProductSearch;