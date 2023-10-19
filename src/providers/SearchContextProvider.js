'use client';
import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext(null);

export default function SearchContextProvider({children}){
  const [contextDescription, setContextDescription] = useState("");
  const [contextBrand, setContextBrand] = useState({id: 0, description: "All", image_url: 'none'});
  const [contextModel, setContextModel] = useState({id: 0, description: "All", brandId: 0, brandDescription: "All"});
  const [contextCategory, setContextCategory] = useState({id: 0, description: "All", image_url: 'none'});
  const [contextSubCategory, setContextSubCategory] = useState({id: 0, description: "All", image_url: 'none'});
  const [contextBrands, setContextBrands] = useState([]);
  const [contextFeatures, setContextFeatures] = useState([]);
  const [contextPriceMin, setContextPriceMin] = useState(0);
  const [contextPriceMax, setContextPriceMax] = useState(0);
  const [contextSortBy, setContextSortBy] = useState("description");
  const [contextOrder, setContextOrder] = useState("ASC");
  const [contextCaller, setContextCaller] = useState("");

  return (
    <SearchContext.Provider value={{
      contextDescription,
      setContextDescription,
      contextBrand,
      setContextBrand,
      contextModel,
      setContextModel,
      contextCategory,
      setContextCategory,
      contextSubCategory,
      setContextSubCategory,
      contextBrands,
      setContextBrands,
      contextFeatures,
      setContextFeatures,
      contextPriceMin,
      setContextPriceMin,
      contextPriceMax,
      setContextPriceMax,
      contextSortBy,
      setContextSortBy,
      contextOrder,
      setContextOrder,
      contextCaller,
      setContextCaller,
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext(){
  const context = useContext(SearchContext);
  if(!context){
    throw new Error("Must be used within a ContextProvider");
  }
  return context;
}