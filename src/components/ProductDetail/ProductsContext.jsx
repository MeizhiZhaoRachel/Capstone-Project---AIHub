// ProductsContext.js
import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

const products = [
    {
      id: 1,
      name: "ChatGPT",
      imageUrl: "../public/img/chatgpt.jpg",
      description: "ChatGPT Image Description", // Changed 'alt' to 'description' for consistency
    },
    {
      id: 2,
      name: "Gemini",
      imageUrl: "../public/img/gemini.jpg",
      description: "Gemini Image Description",
    },
    {
      id: 3,
      name: "WenXinYiYan",
      imageUrl: "../public/img/wenxinyiyan.jpg",
      description: "WenXinYiYan Image Description",
    },
  ];

  return (
    <ProductContext.Provider value={{products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);