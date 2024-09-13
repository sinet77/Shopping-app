import Product from "./components/Product/Product";
import style from "./App.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./components/context/appContext";

function App() {
  const {
    filteredProducts,
    category,
    getCategories,
    numberOfProductsInCart,
    handleCategoryChange,
  } = useAppContext();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/cart");
  };

  const handleCategoryPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    navigate(`/${selectedCategory}`);
    handleCategoryChange(event);
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
      <div className={style.optionsStyle}>
        Choose category:
        <select onChange={handleCategoryPath} value={category}>
          <option value="">All categories</option>
          {getCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() +
                category.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className={style.main}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
