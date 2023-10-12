'use client';
import React from 'react';
import useWindowDimensions from '@/hooks/useWindowDimension';

const HomePage = () => {
  const { width=500, height=500 } = useWindowDimensions();

  return (
    <div className='pt-[50px]' style={{minHeight: (height-80)}}>HomePage</div>
  );
};

export default HomePage;