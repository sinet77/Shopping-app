import Product from "./components/Product/Product";
import { useAppContext } from "./components/context/appContext";
import Layout from "./Layout/Layout";
import style from "./App.module.css";
import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory";

function App() {
  return (
    <Layout>
      <ProductsByCategory />
    </Layout>
  );
}

export default App;
