import { ProductProps } from "./components/Product/ProductTypes";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Cart.module.css";
import { useEffect, useState } from "react";

export default function Cart() {
  const location = useLocation();
  const productsInCart: ProductProps[] = location.state?.productsInCart || [];

  const [togetherPrice, setTogetherPrice] = useState<number>(0);
  const [priceWithQuantity, setPriceWithQuantity] = useState<{
    [key: number]: number;
  }>(() => {
    const startingQuantities: { [key: number]: number } = {};
    productsInCart.forEach((product) => {
      startingQuantities[product.id] = 1;
    });
    return startingQuantities;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price * priceWithQuantity[product.id],
      0
    );
    setTogetherPrice(total);
  }, [productsInCart, priceWithQuantity]);

  function handleCloseButton() {
    navigate("/");
  }

  function handleInputValue(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    const quantity = e.target.value;
    setPriceWithQuantity((prev) => ({
      ...prev,
      [id]: quantity === "" ? "" : Number(quantity),
    }));
  }

  return (
    <div className={style.cartContainer}>
      <div className={style.headContainer}>
        <h2 className={style.headtitle}>Your Cart</h2>
        <button className={style.closeButton} onClick={handleCloseButton}>
          X
        </button>
      </div>
      <div className={style.productList}>
        {productsInCart.length > 0 ? (
          productsInCart.map((product: ProductProps) => (
            <div key={product.id} className={style.productItem}>
              <img
                src={product.image}
                alt={product.title}
                className={style.productImage}
              />
              <h3 className={style.productTitle}>{product.title}</h3>
              <input
                className={style.inputQuantityNumber}
                type="number"
                value={priceWithQuantity[product.id]}
                onChange={(e) => handleInputValue(e, product.id)}
                min="1"
              ></input>
              <p className={style.productPrice}>
                Price: $
                {(product.price * priceWithQuantity[product.id]).toFixed(2)}
              </p>
              <button className={style.removeButton}>Remove</button>
            </div>
          ))
        ) : (
          <p>No products in cart.</p>
        )}
      </div>
      <div className={style.totalPrice}>
        Price together: ${togetherPrice.toFixed(2)}
      </div>
    </div>
  );
}
