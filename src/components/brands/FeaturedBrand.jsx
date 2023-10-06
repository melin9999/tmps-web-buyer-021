import { CameraAlt } from "@mui/icons-material";
import Image from "next/image";

const FeaturedBrand = ({itemWidth, val}) => {
  return (
    <div className='flex flex-col justify-center items-center px-2'>
      <div className='flex justify-center items-center relative mb-1' style={{width: (itemWidth), height: (itemWidth)}}>
        {val.image_url==="none"?<CameraAlt sx={{width: 90, height: 90, color: '#cbd5e1'}}/>:
        <Image src={val.image_url} alt="category image" fill sizes={(itemWidth)+'px'} priority={true} style={{objectFit: 'cover'}}/>}
      </div>
      <span className='flex flex-col w-full text-xs sm:text-sm opacity-100 font-semibold break-words h-[50px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #60A5FA'}}>{val.description}</span>
      <div className='flex flex-row justify-between items-end w-full px-2 my-2'>
        <span></span>
        <span className='text-xs sm:text-sm py-1 font-semibold text-blue-400'>{val.count+" items"}</span>
      </div>
    </div>
  )
}

export default FeaturedBrand;