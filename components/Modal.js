import styles from '../styles/Home.module.scss'

const Modal = ({setIsOpen}) => {
//   const closeModal = useCallback(() => {
//     // Fake code, pretend to start the closing transition
//     // and call `onClose` when the transition is done
//     startCloseTransition(onClose);
// }, [onClose]);

  return (
    <div className={styles.outerModal}>
      <div className={styles.innerModal}>
          <div className={styles.modalHeader}>
            <h3>Header</h3>
            <div onClick={() => setIsOpen(false)} className={styles.close}>X</div>
          </div>
      </div>
    </div>
  )
}

export default Modal