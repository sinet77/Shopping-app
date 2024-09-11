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
  const [productsInCart, setProductsInCart] = useState<ProductProps[]>([]);
  const [numberOfProductsInCart, setNumberOfProductsInCart] =
    useState<number>(0);

  const [addProductToFavorites, setAddProductToFavorites] = useState<
    ProductProps[]
  >([]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/cart", { state: { productsInCart } });
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

  console.log("Ulubione produkty:", addProductToFavorites);

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
            handleAddToCart={handleAddToCart}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            isFavorite={addProductToFavorites.some(
              (item) => item.id === product.id
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
