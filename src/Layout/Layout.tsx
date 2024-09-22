import { Outlet, useNavigate } from "react-router-dom";
import style from "./Layout.module.css";
import { useAppContext } from "../components/context/appContext";
import { useState } from "react";
import ModalCart from "../components/ModalCart/ModalCart";

export default function ProductsLayout() {
  const {
    category,
    getCategories,
    numberOfProductsInCart,
    handleCategoryChange,
    handleSortChange,
    sortCriteria,
    productsInCart,
  } = useAppContext();

  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleCategoryPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    handleCategoryChange(event);
    navigate(`/products/${selectedCategory}`);
  };

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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

      <Outlet />

      {modalOpen && (
        <ModalCart isOpen={modalOpen} onClose={handleCloseModal}>
          <div className={style.Configuration}>
            {productsInCart.length > 0 ? (
              <>
                <h3>Your added products:</h3>
                {productsInCart.map((product) => (
                  <div key={product.id} className={style.productItem}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={style.productImage}
                    />
                    <h4 className={style.productTitle}>{product.title}</h4>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))}
                <button
                  className={style.GoToCartButton}
                  onClick={() => {
                    handleCloseModal();
                    navigate("/cart");
                  }}
                >
                  Go to the cart
                </button>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
            <button className={style.CloseButton} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </ModalCart>
      )}
    </div>
  );
}
