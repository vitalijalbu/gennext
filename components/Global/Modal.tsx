import cn from "classnames";
import { FC, ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import styles from "./Modal.module.scss";

type ModalState = [boolean, () => void];

const Modal: FC<{ state: ModalState; className?: string }> = (props) => {
  const { children, state, className = "" } = props;
  const [open, setClose] = state;
  const [portal, setPortal] = useState<ReactPortal | null>(null);

  useEffect(() => {
    const nextEl = document.querySelector("#__next");
    if (nextEl) {
      const ModalReactNode = (
        <RemoveScroll enabled>
          <div className={cn(styles.modal, className)}>
            <div className={styles.close} onClick={() => setClose()} />
            {children}
          </div>
        </RemoveScroll>
      );
      setPortal(createPortal(ModalReactNode, nextEl));
    }
  }, [children, setClose, className]);

  return open ? portal : null;
};

export default Modal;
