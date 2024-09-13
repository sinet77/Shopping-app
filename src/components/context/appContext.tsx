import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductProps } from "./components/Product/ProductTypes.ts";

interface AppContextType {
  products: ProductProps[];
  filteredProducts: ProductProps[];
  category: string;
  getCategories: string[];
  productsInCart: ProductProps[];
  numberOfProductsInCart: number;
  setNumberOfProductsInCart: (n: number) => void;
  addProductToFavorites: ProductProps[];
  addFavorite: (product: ProductProps) => void;
  removeFavorite: (productId: number) => void;
  setCategory: (category: string) => void;
  setProductsInCart: (products: ProductProps[]) => void;
  handleAddToCart: (product: ProductProps) => void;
  fetchAllProducts: () => void;
  getAllCategories: () => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [getCategories, setGetCategories] = useState<string[]>([]);
  const [productsInCart, setProductsInCart] = useState<ProductProps[]>([]);
  const [numberOfProductsInCart, setNumberOfProductsInCart] =
    useState<number>(0);
  const [addProductToFavorites, setAddProductToFavorites] = useState<
    ProductProps[]
  >([]);

  useEffect(() => {
    fetchAllProducts();
    getAllCategories();
  }, []);

  useEffect(() => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  }, [category, products]);

  const fetchData = async function <T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const fetchAllProducts = async () => {
    const data = await fetchData<ProductProps[]>(
      "https://fakestoreapi.com/products/"
    );

    setProducts(data);
    setFilteredProducts(data);
  };

  const getAllCategories = async () => {
    const data = await fetchData<string[]>(
      "https://fakestoreapi.com/products/categories"
    );

    setGetCategories(data);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleAddToCart = (product: ProductProps) => {
    setNumberOfProductsInCart((prev) => prev + 1);
    setProductsInCart((prev) => [...prev, product]);
  };

  const addFavorite = (product: ProductProps) => {
    setAddProductToFavorites((prev) => [...prev, product]);
  };

  const removeFavorite = (productId: number) => {
    setAddProductToFavorites((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filteredProducts,
        category,
        getCategories,
        productsInCart,
        numberOfProductsInCart,
        addProductToFavorites,
        setProductsInCart,
        handleCategoryChange,
        addFavorite,
        removeFavorite,
        setCategory,
        handleAddToCart,
        setNumberOfProductsInCart,
        fetchAllProducts,
        getAllCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
