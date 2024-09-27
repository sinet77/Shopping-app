import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductProps } from "../Product/ProductTypes";

interface AppContextType {
  category: string;
  getCategories: string[];
  productsInCart: ProductProps[];
  addProductToFavorites: ProductProps[];
  addFavorite: (product: ProductProps) => void;
  removeFavorite: (productId: number) => void;
  setCategory: (category: string) => void;
  setProductsInCart: (products: ProductProps[]) => void;
  handleAddToCart: (product: ProductProps) => void;
  getAllCategories: () => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortCriteria: string;
  filteredProducts: ProductProps[];
  setFilteredProducts: (product: ProductProps[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [getCategories, setGetCategories] = useState<string[]>([]);
  const [productsInCart, setProductsInCart] = useState<ProductProps[]>([]);

  const [addProductToFavorites, setAddProductToFavorites] = useState<
    ProductProps[]
  >([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllCategories();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (productsInCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(productsInCart));
    }
    if (addProductToFavorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(addProductToFavorites));
    }
  }, [productsInCart, addProductToFavorites]);

  useEffect(() => {
    const savedProductsInCart = localStorage.getItem("cart");
    const savedFavorites = localStorage.getItem("favorites");
    if (savedProductsInCart) {
      setProductsInCart(JSON.parse(savedProductsInCart));
    }
    if (savedFavorites) {
      setAddProductToFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const getAllCategories = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products/categories");
      const result = await data.json();
      setGetCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortCriteria(value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleAddToCart = (product: ProductProps) => {
    const existingProduct = productsInCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = productsInCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setProductsInCart(updatedCart);
    } else {
      setProductsInCart([...productsInCart, { ...product, quantity: 1 }]);
    }
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
        category,
        getCategories,
        productsInCart,
        addProductToFavorites,
        setProductsInCart,
        handleCategoryChange,
        addFavorite,
        removeFavorite,
        setCategory,
        handleAddToCart,
        getAllCategories,
        handleSortChange,
        sortCriteria,
        filteredProducts,
        setFilteredProducts,
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
