import { useEffect, useState } from "react";
import "./App.module.css";
import Product from "./components/Product/Product";
import { ProductProps } from "./components/Product/ProductTypes";
import style from "./App.module.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const url = "https://fakestoreapi.com/products/";
    const response = await fetch(url);
    const data: ProductProps[] = await response.json();
    setProducts(data);
    console.log(data);
  };

  return (
    <div className={style.background}>
      <div className={style.headline}>
        <h1 className={style.headTitle}>Shopping center</h1>
        <button className={style.cartButton} onClick={handleButtonClick}>
          <img
            className={style.cartIcon}
            src="./src/assets/cart.png"
            alt="cart icon as a button"
          />
        </button>
      </div>
      <div className={style.main}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
