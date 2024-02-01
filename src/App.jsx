import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal';
import './App.css'
import { SquareBoard } from './components/SquareBoard';

function App() {

  const [board, setBoard] = useState(
    Array(9).fill(null)

  );
  const [turn, setTurn] = useState(TURNS.X);
  //null = sin ganador, false es empate
  const [winner, setWinner] = useState(null)



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    //si la casilla tiene marcado algo no se actualiza
    if (board[index] || winner) return

    //actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti();
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)// empate
    }
  }

  return (
    <main className='board'>
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        <SquareBoard board={board} updateBoard={updateBoard} />
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>

  )
}

export default App
