import React, { useState } from 'react';
import './App.css';

const WINNING_LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

function calculateWinner(squares) {
  for (let i = 0; i < WINNING_LINES.length; i += 1) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerData = calculateWinner(squares);
  const isDraw = !winnerData && squares.every(Boolean);

  const handleSquareClick = (index) => {
    if (squares[index] || winnerData) return;

    setSquares((prev) => {
      const nextSquares = [...prev];
      nextSquares[index] = xIsNext ? 'X' : 'O';
      return nextSquares;
    });

    setXIsNext((prev) => !prev);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  let status;
  if (winnerData) {
    status = `Winner: ${winnerData.player}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const renderSquare = (index) => {
    const isWinningSquare =
      winnerData && winnerData.line.includes(index);

    return (
      <button
        key={index}
        className={`square ${isWinningSquare ? 'square--winner' : ''}`}
        onClick={() => handleSquareClick(index)}
        aria-label={`Square ${index + 1}, ${squares[index] || 'empty'}`}
      >
        {squares[index]}
      </button>
    );
  };

  return (
    <div className="app">
      <div className="game-card">
        <header className="game-header">
          <h1 className="game-title">React Tic Tac Toe</h1>
          <p className="game-subtitle">Single-page game built with React</p>
        </header>

        <main className="game-main">
          <div className="status-row">
            <span className="status-label">Status:</span>
            <span className="status-text">{status}</span>
          </div>

          <div className="board">
            <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>

          <button className="reset-button" onClick={handleReset}>
            Reset Game
          </button>
        </main>

        <footer className="game-footer">
          <p>Player X vs Player O &middot; First to get 3 in a row wins.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
