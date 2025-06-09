import React, {useContext} from 'react'
import { calculatorContext } from '../JS/contexts'

const Button = ({ bgColor, text }) => {
    const {handleClick} = useContext(calculatorContext);
  return (
    <button className={`${bgColor} rounded-full flex justify-center items-center shadow/75 w-25 h-25 text-white text-3xl`} id={text} onClick={() => handleClick(text)}>
      {text}
    </button>
  )
}

export default Button
