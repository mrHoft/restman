'use client';

import React from 'react';

import styles from './modal.module.css';

const closeImg = '/icons/cross.svg';

interface ModalComponent {
  show: (children?: React.ReactNode) => void;
  close: (reset?: boolean) => void;
  ({ children }: { children?: React.ReactNode }): React.JSX.Element;
}
type TState = { visible: boolean; children: React.ReactNode | null; reset: boolean };
type TModalSetter = React.Dispatch<React.SetStateAction<TState>>;

export const Modal: ModalComponent = (() => {
  const holder: {
    setState: TModalSetter | null;
    register: (setter: TModalSetter) => void;
  } = { setState: null, register: (setter: TModalSetter) => (holder.setState = setter) };

  const Container = ({ children }: { children?: React.ReactNode }) => {
    const [state, setState] = React.useState<TState>({ visible: false, children, reset: false });
    holder.register(setState);

    const handleClick = (event: React.MouseEvent) => {
      if (!state.visible) return;
      const { target, currentTarget } = event;
      if (target === currentTarget) {
        event.preventDefault();
        closeModal();
      }
    };

    const closeModal = () => setState(prev => ({ ...prev, visible: false, reset: true }));

    return (
      <div className={state.visible ? styles.modal__outer : styles.modal__outer_hidden} onClick={handleClick}>
        <div className={styles.modal__inner}>
          <div className={styles.modal__close} onClick={closeModal}>
            <img src={closeImg} alt="close" />
          </div>
          {!state.reset && state.children}
        </div>
      </div>
    );
  };

  Container.show = (children?: React.ReactNode) => {
    if (children && holder.setState) holder.setState({ visible: true, children, reset: false });
    else if (holder.setState) holder.setState(prev => ({ ...prev, visible: true, reset: false }));
  };

  Container.close = (reset: boolean = false) => {
    if (holder.setState) holder.setState(prev => ({ ...prev, visible: false, reset }));
  };

  return Container;
})();
