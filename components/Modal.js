import styles from '../styles/Home.module.scss'
import Image from 'next/image'

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
          <div className={styles.modalContent}>
            <div className={styles.modalImage}>
              <Image src="/cap-three.png" width={1000} height={773} layout="responsive"/>
            </div>
           <p><span>Circular Commons.</span> Expands the concept of sustainability to embrace circular principles as part of a social, political, and economic commons.</p>
           <p>
            <span>Non-Workers Paradise.</span> A play on the attributed-to-Marxist idea of a worker’s paradise, but in the After Capitalism world we are not working in paid jobs as a means of sustenance.</p>
            <p>
            <span>Tech-Led Abundance.</span> Technological progress drives and leads to an abundance of wealth that fixes the core distribution problem of capitalism.
            </p>
          </div>
      </div>
    </div>
  )
}

export default Modal