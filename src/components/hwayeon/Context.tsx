import { createContext, useContext, useMemo, useState } from 'react';

const ModalValueContext = createContext();
const ModalActionsContext = createContext();

function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    visible: false,
    message: ''
  });

  const actions = useMemo(
    () => ({
      open(message) {
        setModal({
          message,
          visible: true
        });
      },
      close() {
        setModal((prev) => ({
          ...prev,
          visible: false
        }));
      }
    }),
    []
  );

  return (
    <ModalActionsContext.Provider value={actions}>
      <ModalValueContext.Provider value={modal}>
        {children}
      </ModalValueContext.Provider>
    </ModalActionsContext.Provider>
  );
}

function useModalValue() {
  const value = useContext(ModalValueContext);
  if (value === undefined) {
    throw new Error('useModalValue should be used within ModalProvider');
  }
  return value;
}

function useModalActions() {
  const value = useContext(ModalActionsContext);
  if (value === undefined) {
    throw new Error('useModalActions should be used within ModalProvider');
  }
  return value;
}