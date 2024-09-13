import { ProductProps } from "./ProductTypes";
import style from "./Product.module.css";
import { useAppContext } from "../context/appContext";

interface ProductComponentProps {
  product: ProductProps;
}

export default function Product({ product }: ProductComponentProps) {
  const {
    handleAddToCart,
    addFavorite,
    removeFavorite,
    addProductToFavorites,
  } = useAppContext();
  {
    const { id, title, price, category, description, image } = product;

    const isFavorite = addProductToFavorites.some((item) => item.id === id);

    const handleAddToFavorites = () => {
      if (isFavorite) {
        removeFavorite(id);
      } else {
        addFavorite(product);
      }
    };

    return (
      <div className={style.productBox}>
        <div className={style.favoriteContainer}>
          <span className={style.favoriteText}>Add to favorite</span>
          <span className={style.favoriteIcon} onClick={handleAddToFavorites}>
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.36-.55L12 2 8.36 8.69 2 9.24l4.54 4.73L5.82 21z"
                  strokeWidth="1"
                  stroke="black"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l2.83 5.73 6.36.55-4.64 4.48 1.1 6.42L12 15.27 6.35 19.18l1.1-6.42-4.64-4.48 6.36-.55L12 2z"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            )}
          </span>
        </div>
        <img className={style.image} src={image} alt={title} />
        <h2 className={style.title}>{title}</h2>
        <p>
          <strong>Category:</strong>{" "}
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
        <p className={style.description}>{description}</p>

        <button
          className={style.button}
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    );
  }
}
