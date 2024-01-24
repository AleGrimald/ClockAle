import './App.css';
import {useState} from 'react';

function App() {
  const [descanso, setDescanso] = useState(5);
  const [session, setSession] = useState(25);
  const [minutos, setMinuto] = useState(25);
  const [segundos, setSegundo] = useState(`0${0}`);

  let min=minutos;
  let seg= segundos;
  var iMin = undefined;

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

  const resetAll=()=>{
    setSession(25);
    setMinuto(25);
    setSegundo(`0${seg}`);
    setDescanso(5);
  };

  const minTimer=()=>{
    if(min>0){
      min-=1;
      setMinuto(min);
      segTimer();
    }
  };

  const segTimer=()=>{
    seg=60;
    iMin=setInterval(() => {
      seg-=1;
      if(seg>=10){
        setSegundo(seg);
      }else{
        setSegundo(`0${seg}`);
      }
      
      if(min===0 && seg ===0){
        clearInterval(iMin);
      }else if(seg===0){
        setSegundo(`0${seg}`);
        clearInterval(iMin);
        minTimer();
      }
    }, 1000);
  };

  const pauseTimer=()=>{
    clearInterval(iMin);
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
        <div id='time-left' dangerouslySetInnerHTML={{__html:`${minutos} : ${segundos}`}}></div>
      </div>

      <div className='timer-control'>
        <button onClick={minTimer} className='botones_control' id='start_stop'>Start</button>
        <button onClick={pauseTimer} className='botones_control' id='pause'>Pause</button>
        <button onClick={resetAll} className='botones_control' id='reset'>Reset</button>
      </div>
    </div>
  );
}

export default App;
