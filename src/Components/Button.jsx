import React, {useContext} from 'react'
import { calculatorContext } from '../JS/contexts'

const Button = ({ bgColor, text }) => {
    const {handleClick} = useContext(calculatorContext);
  return (
    <button className={`${bgColor} rounded-full flex justify-center items-center shadow/75 w-25 h-25 text-white text-3xl hover:scale-105 transition-all duration-150`} id={text} onClick={() => handleClick(text)}>
      {text}
    </button>
  )
}

export default Button
