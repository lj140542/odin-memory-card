import { useState, Suspense } from 'react';
import Board from './Board';
import '../styles/App.css';

function App() {
  const [gameOverText, setGameOverText] = useState('');
  const [boardKey, setBoardKey] = useState(0)
  const [scores, setScores] = useState({ current: 0, high: 0 });

  const handleScoreIncrease = () => {
    let newCurrent = scores.current + 1;
    setScores({ current: newCurrent, high: ((newCurrent > scores.high) ? newCurrent : scores.high) });
  }

  const handleGameOver = (isVictory) => {
    if (isVictory) setGameOverText('You win, well done! Continue to play to increase your score !');
    else {
      setGameOverText('You lose, try again!');
      setScores({ ...scores, current: 0 });
    }
  }

  const resetBoard = () => {
    setBoardKey(boardKey + 1);
    setGameOverText('');
  }

  return (
    <>
      <div id='title'>
        <h2>Memory Card Game</h2>
        <div className='scores'>
          <p>Score : {scores.current}</p>
          <p>High score : {scores.high}</p>
        </div>
      </div>
      {gameOverText === ''
        ?
        <Suspense fallback={<div className='board loading'>Loading..</div>} >
          <Board key={boardKey} increaseScore={handleScoreIncrease} gameOver={handleGameOver} />
        </Suspense>
        :
        <div className='game-over'>
          <h3>{gameOverText}</h3>
          <button onClick={resetBoard} type='button'>Continue</button>
        </div>
      }

    </>
  )
}

export default App
