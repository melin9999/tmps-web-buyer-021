import { CameraAlt } from "@mui/icons-material";
import Image from "next/image";

const FeaturedBrand = ({itemWidth, val, vertical}) => {
  return (
    <>
      {vertical?
        <div className='flex flex-col justify-center items-center bg-zinc-200 pb-3' style={{width: (itemWidth)}}>
          <div className='flex flex-col justify-center items-center bg-white' style={{width: (itemWidth)}}>
            <div className='flex flex-col xxs:flex-row justify-between items-start'>
              <div className='flex justify-center items-center w-full xxs:w-[100px] mt-2 xxs:mt-0 mb-1 xxs:mb-0'>
                <div className='flex justify-center items-center relative' style={{width: (100), height: (100)}}>
                  {val.image_url==="none"?<CameraAlt sx={{width: 80, height: 80, color: '#cbd5e1'}}/>:
                  <Image src={val.image_url} alt="category image" fill sizes={'100px'} priority={true} style={{objectFit: 'contain'}}/>}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start" style={{width: itemWidth>320?(itemWidth-100):itemWidth}}>
                <span className='flex flex-col w-full text-xs font-semibold h-[28px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #D1D5DB'}}>{val.description}</span>
                <div className='flex flex-row justify-between items-end w-full px-2 my-2'>
                  <span></span>
                  <span className='text-xs sm:text-sm py-1 font-semibold text-blue-400'>{val.count+" items"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      :
        <div className='flex flex-col justify-center items-center bg-slate-200' style={{width: (itemWidth-5), marginLeft: 5, marginRight: 5}}>
          <div className='flex flex-col justify-center items-center bg-white' style={{width: (itemWidth-5)}}>
            <div className='flex justify-center items-center relative mb-1' style={{width: (itemWidth-10), height: (itemWidth-10)}}>
              {val.image_url==="none"?<CameraAlt sx={{width: 90, height: 90, color: '#cbd5e1'}}/>:
              <Image src={val.image_url} alt="category image" fill sizes={(itemWidth-10)+'px'} priority={true} style={{objectFit: 'cover'}}/>}
            </div>
            <span className='flex flex-col w-full text-xs sm:text-sm opacity-100 font-semibold break-words h-[50px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #60A5FA'}}>{val.description}</span>
            <div className='flex flex-row justify-between items-end w-full px-2 my-2'>
              <span></span>
              <span className='text-xs sm:text-sm py-2 font-semibold text-blue-400'>{val.count+" items"}</span>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default FeaturedBrand;