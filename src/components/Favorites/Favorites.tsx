import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import style from "./Favorites.module.css";

export default function Favorites() {
  const { addProductToFavorites } = useAppContext();

  const navigate = useNavigate();

  function handleCloseButton() {
    navigate("/");
  }

  return (
    <div className={style.favoritePage}>
      <div className={style.headContainer}>
        <h2 className={style.headtitle}>Your favorites</h2>
        <button className={style.closeButton} onClick={handleCloseButton}>
          X
        </button>
      </div>
      {addProductToFavorites.length > 0 ? (
        addProductToFavorites.map((product) => (
          <ul className={style.favoriteBox}>
            <img
              className={style.image}
              src={product.image}
              alt={product.title}
            />
            <div className={style.descriptionBox}>
              <div className={style.title}>{product.title}</div>
              <div className={style.description}>{product.description}</div>
              <div className={style.price}>${product.price}</div>
            </div>
          </ul>
        ))
      ) : (
        <p>No favorite products added yet.</p>
      )}
    </div>
  );
}
