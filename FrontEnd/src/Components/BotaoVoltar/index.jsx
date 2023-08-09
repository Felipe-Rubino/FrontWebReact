import React from 'react'
import { FiArrowLeft } from "react-icons/fi"; 
import "./styles.css"   
const BotaoVoltar = () => {
    function goBack(){
        window.history.back()
    }

  return (
    <button className='botaovoltar' onClick={goBack}>
        <FiArrowLeft />
    </button>
  )
}

export default BotaoVoltar