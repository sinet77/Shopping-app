import Product from "./components/Product/Product";
import { useAppContext } from "./components/context/appContext";
import Layout from "./Layout/Layout";
import style from "./App.module.css";

function App() {
  const { filteredProducts, loading } = useAppContext();

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

export default App;
