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

  model: {
    SHOWCODE: (state, data) => ({ ...state, [data]: state[data] ? false : true })
  },

  intent: ({ DOM }) => ({ SHOWCODE: DOM.select('.show-code').events('click').map(e => e.target.dataId) }),

  // define the view
  // the view is a function that takes an object with the current state and returns a virtual DOM tree
  // unlike other fromeworks, no user actions are defined or called in the view
  // the view is only used to render the current state and should be a pure function
  view: ({ state }) => {
    const {
      showSearchCode = false,
      showClockCode = false,
      showTicTacToeCode = false
    } = state

    const section = (name, children) => (<div className="example-section" key={ name }><h2>{ name }</h2>{ children }</div>)

    return (
      <>

        <h1>Sygnal Examples</h1>

        { section('Search Input', (
          <>
            <Search state="search" />
            <button className="show-code" dataId="showSearchCode">{ showSearchCode ? 'Hide' : 'Show' } Code</button>
            { showSearchCode &&
              <div>
                <script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Ftpresley%2Fsygnal-template%2Fblob%2Fmain%2Fcomponents%2Fsearch.jsx&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>
              </div>
            }
          </>
        )) }

        { section('Clock', (
          <>
            <Clock state="clock" />
            <button className="show-code" dataId="showClockCode">{ showClockCode ? 'Hide' : 'Show' } Code</button>
            { showClockCode &&
              <div>
                <script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Ftpresley%2Fsygnal-template%2Fblob%2Fmain%2Fcomponents%2Fclock.jsx&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>
                <script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Ftpresley%2Fsygnal-template%2Fblob%2Fmain%2Fcomponents%2Fdigit.jsx&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>
              </div>
            }
          </>
        )) }
        { section('Tic Tac Toe',  (
          <>
            <TicTacToe state="tictactoe" />
            <button className="show-code" dataId="showTicTacToeCode">{ showTicTacToeCode ? 'Hide' : 'Show' } Code</button>
            { showTicTacToeCode &&
              <div>
                <script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Ftpresley%2Fsygnal-template%2Fblob%2Fmain%2Fcomponents%2Ftictactoe.jsx&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>
              </div>
            }
          </>
        )) }

      </>
    )
  }
})
