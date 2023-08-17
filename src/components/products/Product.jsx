import { CameraAlt } from "@mui/icons-material";
import Image from "next/image";

const Product = ({width, itemWidth, val}) => {
  return (
    <div className='flex flex-col justify-center items-center bg-slate-200' style={{width: itemWidth, paddingRight: 7, paddingLeft: 7}} key={val.id}>
      <div className='flex flex-col justify-center items-center bg-white' style={{width: (itemWidth-(14))}} key={val.id}>
        <span className='flex flex-col w-full text-xs opacity-100 font-semibold break-words h-[35px] mt-2 mb-2 overflow-hidden px-2'>{val.heading}</span>
        <div className='flex justify-center items-center relative mb-1' style={{width: (itemWidth-(14)), height: (itemWidth-(14))}}>
          {val.image_url==="none"?<CameraAlt sx={{width: 90, height: 90, color: '#cbd5e1'}}/>:
          <Image src={val.image_url} alt="product image" fill sizes={(itemWidth-14)+'px'} priority={true} style={{objectFit: 'cover'}}/>}
        </div>
        <span className='flex flex-col w-full text-xs opacity-100 font-semibold break-words h-[50px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #a7f3d0', borderBottomRadius: 5}}>{val.short_description}</span>
        <div className='flex flex-row justify-start items-center w-full px-2 gap-1 flex-wrap py-1 h-[50px] overflow-hidden' style={{borderBottom: '1px solid #a7f3d0', borderBottomRadius: 5}}>
          {val.featured==="yes"&&<span className='flex flex-col py-1 px-2 bg-yellow-200 text-yellow-800 rounded text-[9px] font-semibold'>Featured</span>}
          {val.free_shipping==="yes"&&<span className='flex flex-col py-1 px-2 bg-purple-200 text-purple-800 rounded text-[9px] font-semibold'>Free Shipping</span>}
          {val.quantity_discount_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-semibold'>{`Buy ${val.quantity_discount_amount} to get ${val.quantity_discount}% off!`}</span>}
          {val.quantity_free_issue_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-semibold'>{`Buy ${val.quantity_free_issue_amount} to get ${val.quantity_free_issue} free!`}</span>}
          {val.order_total_discount_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-semibold'>{`${val.order_total_discount}% off for orders more than Rs. ${parseFloat(val.order_total_discount_amount).toFixed(2)}!`}</span>}
        </div>
        <div className='flex flex-row justify-between items-center w-full px-2 my-2'>
          {parseFloat(val.discount)>0.0?
            <div className='flex flex-row justify-between items-center w-[70px] bg-rose-200 p-2' style={{border: '1px solid #fb7185', borderRadius: 5}}>
              <span className='text-xs font-semibold w-full text-right'>{val.discount+"% off"}</span>
            </div>:
            <div></div>
          }
          <div className='flex flex-row justify-between items-center w-[110px] bg-blue-100 p-2' style={{border: '1px solid #3b82f6', borderRadius: 5}}>
            <span className='font-semibold text-xs'>{"Rs."}</span>
            <span className='text-xs font-semibold'>{parseFloat(val.price).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;