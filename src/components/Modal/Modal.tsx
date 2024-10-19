import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  title: string;
  content?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  backgroundColor?: string;
  overlayClick?: boolean;
  width: string;
  height: string;
  textAlign?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  setIsOpen,
  children,
  backgroundColor,
  overlayClick = true,
  width,
  height,
  textAlign,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // @ts-ignore
    if (e.target.id !== "overlay" || !overlayClick) return;

    setIsOpen(false);
  };

  const customStyle = {
    backgroundColor: !backgroundColor ? "" : backgroundColor,
    width: width,
    height: height,
    textAlign: !textAlign ? "" : textAlign
  };

  return (
    <div
      id="overlay"
      className={styles.container}
      onClick={(e) => handleOverlayClick(e)}
    >
      {/* @ts-ignore */}
      <div className={styles.frontArea} style={customStyle}>
        <h3 className={styles.modalText}>{title}</h3>
        <p className={styles.modalText}>{content}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
