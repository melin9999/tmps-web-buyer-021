import { CameraAlt } from "@mui/icons-material";
import Image from "next/image";

const FeaturedProduct = ({itemWidth, val, vertical}) => {
  return (
    <>
      {vertical?
        <div className='flex flex-col justify-center items-center bg-zinc-200 pb-3' style={{width: (itemWidth)}}>
          <div className='flex flex-row justify-between items-start bg-white'>
            <div className='flex justify-center items-center relative mb-1' style={{width: (150), height: (150)}}>
              {val.image_url==="none"?<CameraAlt sx={{width: 80, height: 80, color: '#cbd5e1'}}/>:
              <Image src={val.image_url} alt="product image" fill sizes={(150)+'px'} priority={true} style={{objectFit: 'cover'}}/>}
            </div>
            <div className="flex flex-col justify-start items-start" style={{width: (itemWidth-150), height: (150)}}>
              <span className='flex flex-col w-full text-xs font-semibold h-[28px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #D1D5DB'}}>{val.heading}</span>
              <span className='flex flex-col w-full text-[11px] font-normal break-words h-[45px] overflow-hidden px-2 py-1'>{val.short_description}</span>
              <div className='flex flex-row overflow-hidden px-2 gap-1 flex-wrap h-[65px]' style={{width: (itemWidth-150)}}>
                {val.featured==="yes"&&<span className='flex flex-row h-[22px] py-1 px-2 bg-yellow-200 text-yellow-800 rounded text-[10px] font-bold'>Featured</span>}
                {val.free_shipping==="yes"&&<span className='flex flex-col h-[22px] py-1 px-2 bg-purple-200 text-purple-800 rounded text-[10px] font-bold'>Free Shipping</span>}
                {val.quantity_discount_amount>0&&<span className='flex flex-col h-[22px] py-1 px-2 bg-emerald-200 text-emerald-800 rounded text-[9px] font-bold'>{`Buy ${val.quantity_discount_amount} to get ${val.quantity_discount}% off!`}</span>}
                {val.quantity_free_issue_amount>0&&<span className='flex flex-col h-[22px] py-1 px-2 bg-blue-200 text-blue-800 rounded text-[9px] font-bold'>{`Buy ${val.quantity_free_issue_amount} to get ${val.quantity_free_issue} free!`}</span>}
                {val.order_total_discount_amount>0&&<span className='flex flex-col h-[22px] py-1 px-2 bg-pink-200 text-pink-800 rounded text-[9px] font-bold'>{`${val.order_total_discount}% off for orders more than Rs. ${parseFloat(val.order_total_discount_amount).toFixed(2)}!`}</span>}
              </div>
              <div className='flex flex-row justify-end items-end w-full py-1 px-2 pb-1'>
                {parseFloat(val.discount)>0.0 ?
                  <div className='flex flex-col justify-center items-end w-[130px] mr-3'>
                    <span className='text-[10px] font-bold text-red-400'>{val.discount+"% off"}</span>
                    <span className='text-[11px] font-semibold text-zinc-600 line-through'>{"Rs. "+parseFloat(val.price).toFixed(2)}</span>
                  </div>:<div></div>
                }
                <div className='flex flex-row justify-between items-center px-2 py-1 w-[130px] h-[30px]' style={{border: '1px solid #10B981'}}>
                  <span className='font-semibold text-xs text-emerald-600'>{"Rs."}</span>
                  <span className='text-xs font-semibold text-emerald-600'>{parseFloat(val.discounted_price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      :
        <div className='flex flex-col justify-center items-center bg-slate-200 pb-3' style={{width: (itemWidth-5), marginLeft: 5, marginRight: 5}}>
          <div className='flex flex-col justify-center items-center bg-white' style={{width: (itemWidth-5)}}>
            <span className='flex flex-col w-full text-xs opacity-100 font-semibold break-words h-[32px] mt-2 mb-2 overflow-hidden px-2'>{val.heading}</span>
            <div className='flex justify-center items-center relative mb-1' style={{width: (itemWidth-10), height: (itemWidth-10)}}>
              {val.image_url==="none"?<CameraAlt sx={{width: 90, height: 90, color: '#cbd5e1'}}/>:
              <Image src={val.image_url} alt="product image" fill sizes={(itemWidth-10)+'px'} priority={true} style={{objectFit: 'cover'}}/>}
              <div className="flex flex-col justify-center items-end absolute bottom-1 right-1 gap-1" style={{width: (itemWidth-10)}}>
                {val.featured==="yes"&&<span className='flex flex-row py-1 px-2 bg-yellow-200 text-yellow-800 opacity-60 hover:opacity-100 rounded text-[9px] font-bold'>Featured</span>}
                {val.free_shipping==="yes"&&<span className='flex flex-col py-1 px-2 bg-purple-200 text-purple-800 opacity-60 hover:opacity-100 rounded text-[9px] font-bold'>Free Shipping</span>}
                {val.quantity_discount_amount>0&&<span className='flex flex-col py-1 px-2 bg-emerald-200 text-emerald-800 opacity-60 hover:opacity-100 rounded text-[9px] font-bold'>{`Buy ${val.quantity_discount_amount} to get ${val.quantity_discount}% off!`}</span>}
                {val.quantity_free_issue_amount>0&&<span className='flex flex-col py-1 px-2 bg-blue-200 text-blue-800 opacity-60 hover:opacity-100 rounded text-[9px] font-bold'>{`Buy ${val.quantity_free_issue_amount} to get ${val.quantity_free_issue} free!`}</span>}
                {val.order_total_discount_amount>0&&<span className='flex flex-col py-1 px-2 bg-pink-200 text-pink-800 opacity-60 hover:opacity-100 rounded text-[9px] font-bold'>{`${val.order_total_discount}% off for orders more than Rs. ${parseFloat(val.order_total_discount_amount).toFixed(2)}!`}</span>}
              </div>
            </div>
            <span className='flex flex-col w-full text-xs opacity-100 font-semibold break-words h-[50px] py-2 overflow-hidden px-2' style={{borderBottom: '1px solid #a7f3d0'}}>{val.short_description}</span>
            <div className='flex flex-row justify-between items-end w-full h-[43px] px-2 my-2'>
              {parseFloat(val.discount)>0.0?
                <div className='flex flex-row justify-between items-center'>
                  <span className='text-xs font-bold text-red-400'>{val.discount+"% off"}</span>
                </div>:
                <div></div>
              }
              <div className='flex flex-col justify-between items-center w-[110px]'>
                {parseFloat(val.discount)>0.0 &&
                  <div className='flex flex-row justify-end items-center w-full mb-1'>
                    <span className='text-xs font-semibold text-zinc-600 line-through'>{"Rs. "+parseFloat(val.price).toFixed(2)}</span>
                  </div>
                }
                <div className='flex flex-row justify-between items-center w-full px-2 py-1' style={{border: '1px solid #10B981'}}>
                  <span className='font-semibold text-xs text-emerald-600'>{"Rs."}</span>
                  <span className='text-xs font-semibold text-emerald-600'>{parseFloat(val.discounted_price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default FeaturedProduct;

/* 

 */