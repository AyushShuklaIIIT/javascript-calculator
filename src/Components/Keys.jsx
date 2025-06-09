import React, {useContext} from 'react'
import buttonMapping from '../JS/buttonMapping'
import Button from './Button'
import { calculatorContext } from '../JS/contexts'

const Keys = () => {
    const {handleClick} = useContext(calculatorContext);
    return (
        <div className='flex flex-wrap gap-2 p-2'>
            {buttonMapping.map(({ bgColor, text }) => {
                return (<Button key={text} bgColor={bgColor} text={text}></Button>)
            })}
            <button className='bg-[#151d20] rounded-full flex justify-center items-center w-25 h-25 text-white text-2xl shadow/75 hover:scale-105 transition-all duration-150' id="back" onClick={() => handleClick("back")}><span className="material-symbols-outlined scale-150">
                backspace
            </span></button>
            <button className='bg-[#014e60] rounded-full flex justify-center items-center w-25 h-25 text-white text-3xl shadow/75 hover:scale-105 transition-all duration-150' id="=" onClick={() => handleClick("=")}>=</button>
        </div>
    )
}

export default Keys
