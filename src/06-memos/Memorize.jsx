import { useState } from 'react';
import { useCounter } from '../hooks/useCounter';
import { Small } from './Small';

export const Memorize = () => {
  
  const { counter, increment } = useCounter();
  const [show, setShow] = useState(true);
  return (
    <>
      <h1>Counter: <Small value={ counter }/></h1>
      <hr />

      <button
        className="btn btn-success shadow-sm"
        onClick={ () => increment() }
      >
        +1
      </button>

      <button
        className='btn btn-outline-success shadow-sm'
        onClick={ () => setShow( !show ) }
      >
        Show/Hide { JSON.stringify(show) }
      </button>
    </>
  )
}
