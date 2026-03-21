/**
 * TaskItem — renders a single task with toggle and delete actions.
 *
 * Each TaskItem gets its state from the Collection (one element of the tasks array).
 * It communicates back to the parent via the EVENTS bus (a global broadcast channel).
 */
function TaskItem({ state }) {
  return (
    <div className={`task-item ${state.done ? 'done' : ''}`}>
      <button className="toggle">{state.done ? '✓' : '○'}</button>
      <span className="task-text">{state.text}</span>
      <button className="delete">×</button>
    </div>
  )
}

/**
 * INTENT — maps DOM events on this component's own elements to actions.
 *
 * Because of Cycle.js isolation, a parent component can't see DOM events
 * inside a child. Each component handles its own DOM events and communicates
 * upward via EVENTS (global broadcast).
 */
TaskItem.intent = ({ DOM }) => ({
  TOGGLE: DOM.click('.toggle'),
  DELETE: DOM.click('.delete'),
})

/**
 * MODEL — sends messages to the parent via the EVENTS sink.
 *
 * The EVENTS sink broadcasts messages that any ancestor can listen for.
 * The parent (App) subscribes with EVENTS.select('TOGGLE_TASK').
 */
TaskItem.model = {
  TOGGLE: {
    PARENT: (state) => state.id,
  },
  DELETE: () => undefined,
}

export default TaskItem
