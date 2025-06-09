import React, {useContext} from 'react'
import { calculatorContext } from '../JS/contexts'

const Display = () => {
  const { formula } = useContext(calculatorContext);
  return (
    <div className='bg-[#1f2c32] w-full rounded-2xl'>
        <input type="text" className='w-full font-mono text-right h-12 text-2xl pr-3 pt-20 pb-5 text-white' value={formula} disabled/>
    </div>
  )
}

export default Display
