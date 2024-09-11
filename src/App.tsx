import { useEffect, useState } from "react";
import "./App.module.css";
import Product from "./components/Product/Product";
import { ProductProps } from "./components/Product/ProductTypes";
import style from "./App.module.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [getCategories, setGetCategories] = useState<string[]>([]);
  const [numberOfProductsInCart, setNumberOfProductsInCart] =
    useState<number>(0);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchAllProducts();
      await getAllCategories();
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (category == "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  }, [category, products]);

  const fetchData = async (url: string): Promise<any> => {
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
          <div className={style.numberOfProductsInCart}>
            {numberOfProductsInCart}
          </div>
        </button>
      </div>
      <select onChange={handleCategoryChange} value={category}>
        <option value="">All categories</option>
        {getCategories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
      <div className={style.main}>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            setNumberOfProductsInCart={setNumberOfProductsInCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
