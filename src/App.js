import React, {Suspense, useEffect, useState} from 'react';
import './main.scss';
const Cards = React.lazy(() => import('./Components/cards'));


function App() {
  const [timer, setTimer] = useState(30);

  const handleTimer = () => {
    let new_timer = 30;
    setInterval(() => {
      if(new_timer <=0) return new_timer = 30;
        else
        new_timer--;
      setTimer(new_timer);
    }, 1000);
  }
  
  useEffect(() => handleTimer(), []);

  return (
    <div className="container main-wrapper">
      <div className='heading'>
        <h4 title='Search @ Twitter'>Search @ Twitter</h4>
        <p>Auto refresh in {timer}:00 seconds</p>
      </div>

      <Suspense fallback={<h3>Loading...</h3>}>
        <Cards />
      </Suspense>
  
    </div>
  );
}

export default App;
