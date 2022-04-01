import styles from '../styles/Home.module.css'

import {useCallback, useEffect} from 'react';
import { useWeb3React } from '@web3-react/core';
import { connector } from '../config/web3';


export default function Home() {

  const { 
    activate, 
    active, 
    deactivate, 
    account, 
    error,
    chainId 
  } = useWeb3React()

  
  const connect = useCallback (() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])


  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true')
    connect()
  }, [connect])
  //Escuchamos sobre connect


  const disconnect = () => {
    deactivate()
    localStorage.renoveItem('previouslyConnected')
  }

  if (error) {
    return <p>Ha ocurrido un erorr!</p>
  }

  return (
    <div className={styles.container}>
      <h1>Web3 proyect app</h1>

      {
        active
        ? <> 
            <button onClick={disconnect} >Disconnect Wallet</button>
            <p>You are connected to {chainId} network. <br />
               You account is: {account}
            </p>
         </>
        : <button onClick={connect} >Connnect Wallet</button>
      }

    

    </div>
  )
}

// ESTABLECIENDO CONEXION ENTRE METAMASK Y MI LOCALHOST
// DESDE LA CONSOLA DEL BROWSER
// el method ethereum se agrega al tener la extencion de MetaMask
// window.ethereum.request({ method: 'eth_requestAccounts' }).then(console.log)

//Web3 Es una coleccion de formas en las cuales podemos leer y obtener informacion
//Podriamos imaginarlo como una API que utilizamos para acceder a la blockchain de Eth.


// npm install @web3-react/core @web3-react/injected-connector -E
// Libreria que nos brinda recursos y Hooks, listos para trabajar.