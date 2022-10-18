import React, {useState} from 'react'
import '../styles/globals.scss'
import '../components/Modal'
import { ModalContextProvider } from '../components/ModalContext'
// import Modal from '../components/Modal';


function MyApp({ Component, pageProps }) {
  // const [isModal, setIsModal] = useState(false);

  return (

    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
    )
}

export default MyApp



