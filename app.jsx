// import sygnal functions
import { component } from 'sygnal'

// import components
import Search from './components/search'
import Clock from './components/clock'
import TicTacToe from './components/tictactoe'

// import styles
import './style.css'

// define the root component
export default component({
  // name the component
  // this is used for debugging purposes
  name: 'APP',

  // set the initial state
  initialState: {
    search:    { value: '' },
    clock:     { time: new Date() },
    tictactoe: null
  },

  // define the view
  // the view is a function that takes an object with the current state and returns a virtual DOM tree
  // unlike other fromeworks, no user actions are defined or called in the view
  // the view is only used to render the current state and should be a pure function
  view: ({ state }) => {
    const section = (name, children) => (<div className="example-section" key={ name }><h2>{ name }</h2>{ children }</div>)

    return (
      <>

        <h1>Sygnal Examples</h1>

        { section('Search Input', ( <Search state="search" /> )) }
        { section('Clock',        ( <Clock state="clock" /> )) }
        { section('Tic Tac Toe',  ( <TicTacToe state="tictactoe" /> )) }

      </>
    )
  }
})
