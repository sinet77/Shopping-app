import style from "./Successful.module.css";

export default function Successful() {
  return (
    <div className={style.container}>
      <img src="/src/assets/tick.png" />
      <div>Purchase successful. Thank you!</div>
    </div>
  );
}
