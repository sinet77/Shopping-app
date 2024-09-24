import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./ProductsByCategory.module.css";
import Product from "../Product/Product";
import { useAppContext } from "../context/appContext";
import { ProductProps } from "../Product/ProductTypes";

export default function ProductsPage() {
  const { category: urlCategory } = useParams<{ category: string }>();
  const { sortCriteria, setFilteredProducts } = useAppContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

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
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const result = await data.json();
      setProducts(result);
      setFilteredProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (urlCategory) {
          await fetchProductsByCategory(urlCategory);
        } else {
          await fetchAllProducts();
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [urlCategory]);

  console.log("loading", loading);

  if (loading) {
    return <div className={style.Loading}>Loading products...</div>;
  }

  const sortedProducts = [...products];
  if (sortCriteria === "Ascending") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortCriteria === "Descending") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className={style.main}>
      {sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
}
