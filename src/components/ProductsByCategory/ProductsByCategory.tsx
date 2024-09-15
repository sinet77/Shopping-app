import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from "/src/App.module.css";
import { useAppContext } from "../context/appContext";
import Product from "../Product/Product";
import Layout from "../../Layout/Layout";

export default function ProductsPage() {
  const { category: urlCategory } = useParams<{ category: string }>();
  const { fetchProductsByCategory, filteredProducts, loading, setLoading } =
    useAppContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (urlCategory) {
          await fetchProductsByCategory(urlCategory);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [urlCategory, fetchProductsByCategory, setLoading]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <Layout>
      <div className={style.main}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}
