import { useNavigate } from "react-router-dom";
import style from "./Successful.module.css";

export default function Successful() {
  const navigate = useNavigate();

  const handleGoBackButton = () => {
    navigate("/products");
  };

  return (
    <div className={style.container}>
      <img src="/src/assets/tick.png" />
      <div>Purchase successful. Thank you!</div>
      <button className={style.backButton} onClick={handleGoBackButton}>
        Home
      </button>
    </div>
  );
}
