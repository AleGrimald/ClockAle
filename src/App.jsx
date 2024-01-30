import './App.css';
import {useState, useRef, useEffect} from 'react';

function App() {
  const [minuto, setMinuto] = useState(0);
  const [segundo, setSegundo] = useState(10);
  const [descanso, setDescanso] = useState(5);
  const [session, setSession] = useState(25);

  let seg = segundo;
  let minut = minuto;
  const currentTimer = useRef();
  
  useEffect(() => {
    return () => clearInterval(currentTimer.current);
  }, []);


  const startTimer = () => {
    currentTimer.current = setInterval(() => {
      sessionTimer();
    }, 1000);
  };

  const sessionTimer=()=>{
    if(minut>0 & seg===0){
      seg=59;
      setSegundo(seg);
      setMinuto(min=> min - 1);
    }else if(seg>0){
      seg-=1;
      setSegundo(seg);
    }else if(minut===0 && seg===0){
      clearInterval(currentTimer.current);
    }
  }

  const stopTimer = () => {
    clearInterval(currentTimer.current);
  };
  const resetTimer = () => {
      clearInterval(currentTimer.current);
      setMinuto(25);
      setSegundo(0);
  };


  const incrementSession=()=>{
    if(session<60){
      setMinuto(session+1);
      setSession(session+1);
    }
  };

  const decrementSession=()=>{
    if(session>0){
      setSession(session-1)
      setMinuto(session-1);
    }
  };

  const incrementBreak=()=>{
    if(descanso<60){
      setDescanso(descanso+1)
    }
  };

  const decrementBreak=()=>{
    if(descanso>0){
      setDescanso(descanso-1);
    }
  };


  return (
    <div className="App">
      <h1>Cronometro 25 + 5</h1>
      <div className='contenedor__control'>
        <div className='length-control'>
          <div className='labels' id='break-label'>Break Length</div>
          <div className='botones'>
            <button onClick={decrementBreak} className='decrement' id='break-decrement'>-</button>
            <div className='numero' id='break-length' dangerouslySetInnerHTML={{__html: `${descanso}`}}></div>
            <button onClick={incrementBreak} className='increment' id='break-increment'>+</button>
          </div>
        </div>

        <div className='length-control'>
          <div className='labels' id='session-label'>Session Length</div>
          
          <div className='botones'>
            <button onClick={decrementSession} className='decrement' id='session-decrement'>-</button>
            <div className='numero' id='session-length'>{session}</div>
            <button onClick={incrementSession} className='increment' id='session-increment'>+</button>
          </div>
          
        </div>
      </div>
      
      <div className='timer'>
        <div id='timer-label'>Session</div>
        <div id='time-left' dangerouslySetInnerHTML={{__html:`${minuto} : ${segundo}`}}></div>
      </div>

      <div className='timer-control'>
        <button onClick={startTimer} className='botones_control' id='pause'>Start</button>
        <button onClick={stopTimer} className='botones_control' id='start_stop'>Pausa</button>
        <button onClick={resetTimer} className='botones_control' id='start_stop'>Reset</button>
      </div>
    </div>
  );
}

export default App;
