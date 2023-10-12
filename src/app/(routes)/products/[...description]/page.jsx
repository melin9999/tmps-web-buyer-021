'use client';
import React, { useEffect } from 'react';
import { useSearchContext } from '@/providers/SearchContextProvider';

const Products = ({params}) => {
  const {contextDescription, contextCategory, contextSubCategory, contextBrand} = useSearchContext();



  return (
    <div className='pt-10'>Products</div>
  );
};

export default Products;