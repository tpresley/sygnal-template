import { component, ABORT } from 'sygnal'

const INITIAL_BOARD = Array(9).fill('')
const INITIAL_STATE = {
  board: INITIAL_BOARD,
  turn: 'X',
  winner: false
}

export default component({
  name: 'TICTACTOE',

  model: {
    // BOOTSTRAP is a special action that is called when the component is first mounted
    BOOTSTRAP: (state, data) => ({ ...INITIAL_STATE }),
    CLICK:     (state, data) => {
      const { turn, board, winner } = state

      const chosenSpot = parseInt(data)
      const spotIsEmpty = board[chosenSpot] === ''

      if (!(spotIsEmpty && winner === false)) {
        return ABORT
      }

      const nextBoard = board.map((value, currentSpot) => currentSpot === chosenSpot ? turn : value)
      const winOrTie  = findWinnerOrTie(nextBoard)

      if (winOrTie) {
        return { ...state, winner: winOrTie, board: nextBoard }
      }

      const nextTurn = turn === 'X' ? 'O' : 'X'

      return { ...state, turn: nextTurn, board: nextBoard }
    }
  },

  intent: ({ DOM }) => {
    return {
      BOOTSTRAP: DOM.select('.restart').events('click'),
      CLICK:     DOM.select('.square').events('click').map(e => e.target.dataId)
    }
  },

  view: ({ state }) => {
    return (
      <div className="tictactoe-container">
        { <div className="turn">Current Turn: { state.turn }</div> }
        { state.winner && <div className="winner">WINNER: { state.winner }</div> }
        <div className="tictactoe">
          { state.board?.map((mark, i) => (<div className="square" dataId={i}>{ mark }</div>)) }
        </div>
        <button className="restart">Restart</button>
      </div>
    )
  }

})


// helper function to determine if there is a winner or a tie
// - returns false if there is no winner or tie
// - returns 'X' or 'O' if there is a winner
// - returns 'TIE' if there is a tie
function findWinnerOrTie(board) {
  if (typeof board === 'undefined') return false
  const rows = [
    [0,1,2], [3,4,5], [6,7,8], // horizontal
    [0,3,6], [1,4,7], [2,5,8], // vertical
    [0,4,8], [2,4,6]           // diagonal
  ]

  let winner = false

  rows.forEach(([a,b,c]) => {
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) winner = board[a]
  })

  if (board.join('').length === 9 && !winner) winner = 'TIE'

  return winner
}