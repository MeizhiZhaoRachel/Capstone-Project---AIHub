// ProductsContext.js
import React, { createContext, useContext } from "react";
import chatgptImage from "../../img/chatgpt.jpg";
import GeminiImage from "../../img/gemini.jpg";
import WenXinYiYanImage from "../../img/wenxinyiyan.jpg";

const ProductContext = createContext();

// ProductProvider is a component that accepts a `children` prop. The `children` prop is used to pass 
// child components directly into the output of this component, allowing `ProductProvider` to wrap any part 
// of the component tree and provide the `products` data to them.
export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error)
    };
    }
    
    fetchProducts();
}, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: "ChatGPT",
  //     //React doesn't accept direct URLs as image sources, so you need to import the image first.
  //     imageUrl: chatgptImage,
  //     description: "ChatGPT Image",
  //   },
  //   {
  //     id: 2,
  //     name: "Gemini",
  //     imageUrl: GeminiImage,
  //     description: "Gemini Image",
  //   },
  //   {
  //     id: 3,
  //     name: "WenXinYiYan",
  //     imageUrl: WenXinYiYanImage,
  //     description: "WenXinYiYan Image",
  //   },
  // ];

  // The Provider component accepts a `value` prop to be passed to consuming components that are descendants 
  // of this Provider. All consumers that are descendants of this Provider will re-render whenever the `value` prop changes.
  // Here, the `products` array is passed as the value of the context, making it available to all child (descendant) components.
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
