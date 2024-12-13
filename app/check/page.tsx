'use client';

import { increment, decrement, incrementByAmount } from '../GlobalRedux/Features/counter/counterSlice';
import type { RootState } from '../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main >
        <br /><br /><br /><br />
      <button 
        onClick={() => dispatch(increment())}
      >Increment</button>
      <span>{count}</span>
      <button 
        
        onClick={() => dispatch(decrement())}
      >Decrement</button>
      <button 

        onClick={() => dispatch(incrementByAmount(2))}
      >Increment by 2</button>
    </main>
  )
}
