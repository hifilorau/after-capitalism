import React, {useState, useMemo} from 'react'

export const ModalContext = React.createContext();
 
export const useModal = () => {
    return useContext(ModalContext);
}
 
export const ModalContextProvider = ({ closeModal, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const context = useMemo(() => {
    return {
      closeModal
    };
  }, [closeModal]);
 
  return (
    <ModalContext.Provider value={{isOpen, setIsOpen}}>{children}</ModalContext.Provider>
  );
};