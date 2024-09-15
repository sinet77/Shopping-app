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

  const handleFavoriteButtonClick = () => {
    navigate("/favorites");
  };

  return (
    <div className={style.background}>
      <div className={style.headline}>
        <h1 className={style.headTitle}>Shopping center</h1>
        <div className={style.buttonContainer}>
          <button
            className={style.favoritesButton}
            onClick={handleFavoriteButtonClick}
          >
            <svg
              className={style.favoritesIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Favorites
          </button>
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
