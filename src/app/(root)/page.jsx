'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import useWindowDimensions from '@/hooks/useWindowDimension';
import { ArrowDropDown, CalendarMonth, Close, FilterAlt, ImportExport, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Search } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';

const Home = () => {
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
  const [searchDescription, setSearchDescription] = useState("");
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

  return (
    <div className='form_container mt-10' style={{minHeight: (height-80)}}>
      <div className='form_container_xtra_large' style={{minHeight: (height-80)}}>
        <div className='form_fields_toolbar_container_home pb-3 mt-5' style={{borderBottom: '1px solid #e8e8e8'}}>
          <div className='form_fields_toolbar_container_home_left_1'>
            <TextField 
              id='description'
              label="Search" 
              variant="outlined" 
              className='form_text_field' 
              value={searchDescription} 
              onChange={event=>setSearchDescription(event.target.value)}                     
              disabled={isLoading} 
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search sx={{width: 26, height: 26, color: '#94a3b8'}}/></InputAdornment>,
              }}
              size='small' 
              inputProps={{style: {fontSize: 13}}}
              SelectProps={{style: {fontSize: 13}}}
              InputLabelProps={{style: {fontSize: 15}}}
            />
            <Button 
              variant='contained' 
              disabled={isLoading} 
              style={{textTransform: 'none'}} 
              startIcon={isLoading?<CircularProgress size={18} style={{'color': '#9ca3af'}}/>:<Search />}
              onClick={()=>{}}
              size='small'
              sx={{width: 110}}
            >Search</Button>
            <Button 
              variant='outlined' 
              style={{textTransform: 'none'}} 
              startIcon={<FilterAlt />}
              endIcon={filtersShowing?<KeyboardArrowUp/>:<KeyboardArrowDown/>}
              onClick={()=>setFiltersShowing((val)=>!val)}
              sx={{width: 140}}
              size='small'
            >Filters</Button>
          </div>
          <div className='form_fields_toolbar_container_home_right'>
            <IconButton aria-label="delete" size="small" onClick={()=>getSearchData(searchPage-1)}>
              <KeyboardArrowLeft size={20} />
            </IconButton>
            <Typography sx={{fontSize: 12, color: "#444"}}>{`Page ${searchPage} of ${searchNop}`}</Typography>
            <IconButton aria-label="delete" size="small" onClick={()=>getSearchData(searchPage+1)}>
              <KeyboardArrowRight size={20} />
            </IconButton>
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
              sx={{textAlign: 'right'}}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </TextField>
          </div>
        </div>
        {filtersShowing && 
          <div className='form_fields_toolbar_container_home pb-3 mt-3' style={{borderBottom: '1px solid #e8e8e8'}}>
            <div className='form_fields_toolbar_container_home_left_1'>
              <>
                <div className='form_text_field_constructed_home cursor-pointer'>
                  <span className='form_text_field_constructed_label'>Category</span>
                  <span className='form_text_field_constructed_text' onClick={()=>setOpenCategory(true)}>{searchCategory.description}</span>
                  <div className='form_text_field_constructed_actions'>
                    <Close sx={{width: 20, height: 20, color: '#6b7280'}} onClick={()=>setSearchCategory({id: 0, description: "All"})}/>
                    <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenCategory(true)}/>
                  </div>
                </div>
                <div className='form_text_field_constructed_home cursor-pointer'>
                  <span className='form_text_field_constructed_label'>Brand</span>
                  <span className='form_text_field_constructed_text' onClick={()=>setOpenBrand(true)}>{searchBrand.description}</span>
                  <div className='form_text_field_constructed_actions'>
                    <Close sx={{width: 20, height: 20, color: '#6b7280'}} onClick={()=>setSearchBrand({id: 0, description: "All"})}/>
                    <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenBrand(true)}/>
                  </div>
                </div>
                <div className='form_text_field_constructed_home cursor-pointer'>
                  <span className='form_text_field_constructed_label'>Model</span>
                  <span className='form_text_field_constructed_text' onClick={()=>setOpenModel(true)}>{searchModel.description}</span>
                  <div className='form_text_field_constructed_actions'>
                    <Close sx={{width: 20, height: 20, color: '#6b7280'}} onClick={()=>setSearchModel({id: 0, description: "All", brandId: 0, brandDescription: "All"})}/>
                    <ArrowDropDown sx={{width: 22, height: 22, color: '#6b7280'}} onClick={()=>setOpenModel(true)}/>
                  </div>
                </div>
              </>
            </div>
            <div className='form_fields_toolbar_container_home_right'>
              <TextField
                className='form_text_field_small'
                id='sort-by-2'
                select={true}
                value={searchSortBy}
                onChange={event=>setSearchSortBy(event.target.value)} 
                disabled={isLoading}
                label='Sort By'
                size='small'
                inputProps={{style: {fontSize: 13}}}
                SelectProps={{style: {fontSize: 13}}}
                InputLabelProps={{style: {fontSize: 15}}}
              >
                <MenuItem value={"id"}>ID</MenuItem>
                <MenuItem value={"part_number"}>Part Number</MenuItem>
                <MenuItem value={"description"}>Description</MenuItem>
                <MenuItem value={"price"}>Price</MenuItem>
              </TextField>
              <TextField
                className='form_text_field_small'
                id='order'
                select={true}
                value={searchOrder}
                onChange={event=>setSearchOrder(event.target.value)} 
                disabled={isLoading}
                label='Order'
                size='small'
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ImportExport sx={{width: 20, height: 20, color: '#666'}}/></InputAdornment>,
                }}
                inputProps={{style: {fontSize: 13}}}
                SelectProps={{style: {fontSize: 13}}}
                InputLabelProps={{style: {fontSize: 15}}}
              >
                <MenuItem value={"ASC"}>Ascending</MenuItem>
                <MenuItem value={"DESC"}>Descending</MenuItem>
              </TextField>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;