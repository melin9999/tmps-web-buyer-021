import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const HomeBannerSmall = ({width, banner}) => {
  return (
    <div className='flex flex-col justify-center items-center relative' style={{margin: 0, width: width>1152?(1152):(width-20), height:width>1152?(275):((width/4)*1)}}>
      <Image src={banner.image_url} alt="banner" fill priority={true} style={{objectFit: 'cover'}}/>
      {banner.show_caption==="yes" && banner.link_only==="no" && 
        <div className='flex flex-col w-full lg:max-w-[600px] lg:opacity-70 px-2 py-2' style={width<1024?{backgroundColor: banner.position.backgroundColor}:banner.position}>
          <span className='opacity-100 font-bold text-sm h-[20px] overflow-hidden' style={{color: banner.styles.headingColor}}>{banner.heading}</span>
          {banner.sub_heading===""?
            <span className='mb-2 h-[20px]' style={{borderBottom: '1px solid #D1D5DB'}}></span>:
            <span className='opacity-100 font-bold text-xs mb-2 h-[20px] overflow-hidden' style={{color: banner.styles.subHeadingColor, borderBottom: '1px solid #D1D5DB'}}>{banner.sub_heading}</span>
          }
          <span className='flex opacity-100 font-bold text-[12px] h-[57px] text-justify overflow-hidden' style={{color: banner.styles.contentColor}}>{banner.content}</span>
          {banner.link!=="" && 
            <div className='flex flex-row justify-end items-center mt-3'>
              <Button size='small' variant='outlined' onClick={()=>router.push(banner.link)}>{"Learn More..."}</Button>
            </div>
          }
        </div>
      }
      {banner.link_only==="yes" &&
        <div className='absolute' style={banner.position}>
          <Button size='small' variant='outlined' className='rounded-[10px]' style={{backgroundColor: banner.linkStyles.link_background_color, color: banner.linkStyles.link_text_color, borderColor: banner.linkStyles.link_text_color, borderWidth: 2, textTransform: 'none'}} onClick={()=>router.push(banner.link)}>{"More..."}</Button>
        </div>
      }
    </div>
  )
}

export default HomeBannerSmall;