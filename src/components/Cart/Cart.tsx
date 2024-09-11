import { ProductProps } from "./components/Product/ProductTypes";
import { useLocation } from "react-router-dom";
import style from "./Cart.module.css";
import { useEffect, useState } from "react";

export default function Cart() {
  const location = useLocation();
  const productsInCart: ProductProps[] = location.state?.productsInCart || [];

  const [togetherPrice, setTogetherPrice] = useState<number>(0);

  useEffect(() => {
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price,
      0
    );
    setTogetherPrice(total);
  }, [productsInCart]);

  return (
    <div className={style.cartContainer}>
      <h2 className={style.headtitle}>Your Cart</h2>
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
              <p className={style.productPrice}>Price: ${product.price}</p>
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
