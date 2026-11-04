import { useRef,useEffect } from 'react'

import './App.css'
import controller from './AppController'

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    return controller(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef} className="game-canvas" />;
}

export default App
