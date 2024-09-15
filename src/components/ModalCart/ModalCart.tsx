import style from "./ModalCart.module.css";

export default function ModalCart({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={style.closeButton} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
