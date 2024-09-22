import style from "./ModalCart.module.css";

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalCart({
  isOpen,
  onClose,
  children,
}: ModalCartProps) {
  if (!isOpen) return null;

  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
