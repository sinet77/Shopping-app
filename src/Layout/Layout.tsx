import { useNavigate } from "react-router-dom";
import style from "./Layout.module.css";
import { useAppContext } from "../components/context/appContext";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    category,
    getCategories,
    numberOfProductsInCart,
    handleCategoryChange,
    handleSortChange,
    sortCriteria,
  } = useAppContext();

  const navigate = useNavigate();

  const handleCategoryPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    handleCategoryChange(event);
    navigate(`/products/${selectedCategory}`);
  };

  const handleButtonClick = () => {
    navigate("/cart");
  };

  return (
    <div className={style.background}>
      <div className={style.headline}>
        <h1 className={style.headTitle}>Shopping center</h1>
        <button className={style.cartButton} onClick={handleButtonClick}>
          <img
            className={style.cartIcon}
            src="./src/assets/cart.png"
            alt="cart icon"
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
      <div className={style.optionsStyle}>
        Sorting by price:
        <select onChange={handleSortChange} value={sortCriteria}>
          <option value="">Nothing selected</option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
      {children}
    </div>
  );
}
