import { ProductProps } from "./components/Product/ProductTypes";
import { useNavigate } from "react-router-dom";
import style from "./Cart.module.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

export default function Cart() {
  const { productsInCart, setProductsInCart, setNumberOfProductsInCart } =
    useAppContext();

  const [togetherPrice, setTogetherPrice] = useState<number>(0);
  const [priceWithQuantity, setPriceWithQuantity] = useState<{
    [key: number]: number;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = localStorage.getItem("productsInCart");
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProductsInCart(parsedProducts);
      const initialQuantities: { [key: number]: number } = {};
      parsedProducts.forEach((product: ProductProps) => {
        initialQuantities[product.id] = product.quantity || 1;
      });
      setPriceWithQuantity(initialQuantities);
    }
  }, [setProductsInCart]);

  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  useEffect(() => {
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTogetherPrice(total);
  }, [productsInCart]);

  function handleCloseButton() {
    navigate("/");
  }

  function handleRemoveButton(id: number) {
    setProductsInCart((prev) => prev.filter((product) => product.id !== id));
    setNumberOfProductsInCart((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function handleInputValue(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    const quantity = +e.target.value;
    setPriceWithQuantity((prev) => ({
      ...prev,
      [id]: quantity,
    }));
    setProductsInCart((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: quantity } : product
      )
    );
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
              <button
                className={style.removeButton}
                onClick={() => handleRemoveButton(product.id)}
              >
                Remove
              </button>
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
