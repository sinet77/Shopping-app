import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductProps } from "./components/Product/ProductTypes";

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
  fetchProductsByCategory: (category: string) => void;
  getAllCategories: () => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortCriteria: string;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [getCategories, setGetCategories] = useState<string[]>([]);
  const [productsInCart, setProductsInCart] = useState<ProductProps[]>([]);
  const [numberOfProductsInCart, setNumberOfProductsInCart] =
    useState<number>(0);
  const [addProductToFavorites, setAddProductToFavorites] = useState<
    ProductProps[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAllProducts(), getAllCategories()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const result = await data.json();
      setProducts(result);
      setFilteredProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const fetchProductsByCategory = async (category: string) => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const result = await data.json();
      setProducts(result);
      setFilteredProducts(result);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
    }
    setLoading(false);
  };

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

    const sortedProducts = [...filteredProducts];
    if (value === "Ascending") {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (value === "Descending") {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProducts(sortedProducts);
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

    setNumberOfProductsInCart((prev) => prev + 1);
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
        handleSortChange,
        sortCriteria,
        loading,
        setLoading,
        fetchProductsByCategory,
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
