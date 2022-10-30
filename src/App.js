import React, { useState } from 'react';

import './App.css';

import { Board } from './component/board/Board';
import { Header } from './component/header/Header';

function App() {
  const WIN_CDONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXplaying] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = boxIdx => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? 'X' : 'O';
      } else {
        return value;
      }
    });

    checkWinner(updatedBoard);

    setBoard(updatedBoard);
    setXplaying(!xPlaying);
  };

  const checkWinner = board => {
    for (let i = 0; i < WIN_CDONDITION.length; i++) {
      const [x, y, z] = WIN_CDONDITION[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        createMessage(board[x]);
        setGameOver(true);
        return board[x];
      }
    }
  };

  const createMessage = player => {
    const p = document.createElement('p');
    p.textContent = `Tada player ${player} won the game!`;
    document.querySelector('.App').appendChild(p);
  };

  function clearMessage() {
    document.querySelector('.App p').textContent = '';
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    clearMessage();
  };

  return (
    <div className="App">
      <Header />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
    </div>
  );
}

export default App;
