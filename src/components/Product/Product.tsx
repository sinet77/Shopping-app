import { ProductProps } from "./ProductTypes";
import style from "./Product.module.css";

interface ProductType {
  product: ProductProps;
  setNumberOfProductsInCart: (value: (prev: number) => number) => void;
}

export default function Product({
  product,
  setNumberOfProductsInCart,
}: ProductType) {
  const { id, title, price, category, description, image } = product;

  const handleAddToCart = () => {
    setNumberOfProductsInCart((prev) => prev + 1);
  };

  return (
    <div className={style.productBox}>
      <img className={style.image} src={image} alt={title} />
      <h2 className={style.title}>{title}</h2>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Price:</strong> {price}
      </p>
      <p className={style.description}>{description}</p>
      <button className={style.button} onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
}
