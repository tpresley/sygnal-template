import { xs, ABORT } from 'sygnal'
import TaskItem from './components/TaskItem.jsx'

/**
 * Root component.
 *
 * The VIEW is a pure function of state — no side effects, no event handlers.
 * All user interactions are handled in .intent and .model below.
 */
function App({ state }) {

  return (
    <div className="app">
      <header className="header">
        <div className="logo-row">
          <img src="/favicon.svg" alt="Sygnal" className="logo" />
          <div>
            <h1>Sygnal</h1>
            <p className="tagline">Reactive components with pure functions</p>
          </div>
        </div>
      </header>

      <main>
        <div className="card">
          <div className="card-header">
            <h2>Task Tracker</h2>
            <span className="badge">{state.remaining} remaining</span>
          </div>

          <div className="add-form">
            <input
              type="text"
              className="add-input"
              placeholder="Add a new task..."
              value={state.inputValue}
            />
            <button className="add-btn" attrs={{ disabled: !state.inputValue.trim() }}>Add</button>
          </div>

          {state.tasks.length === 0
            ? <div className="empty"><p>No tasks yet. Add one above!</p></div>
            : <collection of={TaskItem} from="tasks" className="tasks" />
          }
        </div>

        <footer className="footer">
          <p>
            Edit <code>src/App.jsx</code> to get started &mdash;{' '}
            <a href="https://sygnal.js.org" target="_blank" rel="noopener">Docs</a>
          </p>
        </footer>
      </main>
    </div>
  )
}

/**
 * Initial state for the entire app.
 */
App.initialState = {
  inputValue: '',
  nextId: 4,
  tasks: [
    { id: 1, text: 'Learn about Sygnal components', done: true },
    { id: 2, text: 'Explore intent and model', done: false },
    { id: 3, text: 'Build something awesome', done: false },
  ],
}

/**
 * Derived state values
 */
App.calculated = {
  remaining: (state) => state.tasks.filter(t => !t.done).length
}

/**
 * INTENT — declares WHEN actions happen.
 *
 * Maps DOM events to named action streams. Each key becomes an action
 * that triggers the corresponding model entry below.
 *
 * EVENTS.select() listens for messages broadcast by child components.
 */
App.intent = ({ DOM, CHILD }) => ({
  UPDATE_INPUT: DOM.input('.add-input').value(),
  ADD_TASK:     xs.merge(
    DOM.click('.add-btn'),
    DOM.keydown('.add-input').key().filter(key => key === 'Enter')
  ),
  TOGGLE_TASK:  CHILD.select(TaskItem),
})

/**
 * MODEL — declares WHAT happens for each action.
 *
 * Each entry is a pure reducer: (currentState, actionData) => newState.
 * No side effects allowed — just return the new state.
 */
App.model = {
  UPDATE_INPUT: (state, value) => ({
    ...state,
    inputValue: value,
  }),

  ADD_TASK: (state) => {
    const text = state.inputValue.trim()
    if (!text) return ABORT
    return {
      ...state,
      inputValue: '',
      nextId: state.nextId + 1,
      tasks: [...state.tasks, { id: state.nextId, text, done: false }],
    }
  },

  // Toggle a task's done state (id comes from TaskItem via EVENTS)
  TOGGLE_TASK: (state, id) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ),
  }),

}

export default App
