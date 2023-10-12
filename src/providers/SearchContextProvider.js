'use client';
import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext(null);

export default function SearchContextProvider({children}){
  const [contextDescription, setContextDescription] = useState("");
  const [contextBrand, setContextBrand] = useState({id: 0, description: "All"});
  const [contextModel, setContextModel] = useState({id: 0, description: "All", brandId: 0, brandDescription: "All"});
  const [contextCategory, setContextCategory] = useState({id: 0, description: "All"});
  const [contextSubCategory, setContextSubCategory] = useState({id: 0, description: "All"});

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