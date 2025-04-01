import {useState} from 'react';

function Square({value, onSquareClick}: {
  value: string | null;
  onSquareClick: () => void;
}){

  return (
    <button className="square" onClick = {onSquareClick}>
      {value}
    </button>
  )
}

function Board({isXNext, squares, onPlay}: {
  isXNext: boolean;
  squares: Array<string>;
  onPlay: (nextSquares: Array<string>) => void;
}){

  function handleClick(i: number){
    if(calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
      
    if(isXNext) nextSquares[i] = 'X';
    else nextSquares[i] = 'O';

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) status = 'Winner: ' + winner;
  else status = 'Next Player: ' + (isXNext ? 'X' : 'O');

  return (
    <>
      <div className = "status">{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value = {squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value = {squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currMove, setCurrMove] = useState(0);
  const currentSquares = history[currMove];
  const isXNext = (currMove%2 === 0);

  function handlePlay(nextSquares: Array<string>){
    const nextHistory = [...history.slice(0, currMove + 1), nextSquares];
    setHistory((currState) => currState = nextHistory);
    setCurrMove((currState) => currState = nextHistory.length - 1);
  }

  function jumpTo(nextMove: number){
    setCurrMove((currState) => currState = nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Go to move # " + move;
    }else{
      description = 'Go to game start';
    }

    return (
      <li key = {move}>
        <button onClick = {() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className = "game">
      <div className = "game-board">
        <Board isXNext = {isXNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className = "game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <Game />
  )
}

function calculateWinner(squares: Array<string>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}