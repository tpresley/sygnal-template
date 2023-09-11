import { component, xs } from 'sygnal'

const VALUES = [
  { value: '1', label: 'The Great Gatsby' },
  { value: '2', label: 'Moby Dick' },
  { value: '3', label: 'The Odessey' },
  { value: '4', label: 'Of Mice and Men' },
  { value: '5', label: 'Lord of the Flies' },
  { value: '6', label: 'Ender\'s Game' },
  { value: '7', label: 'Old Man and the Sea'}
]

export default component({
  name: 'SEARCH',

  model: {
    FOCUS: (state, data) => ({ ...state, typing: data }),
    INPUT: (state, data) => ({ ...state, value: data }),
    CLEAR: (state, data) => ({ ...state, value: '' })
  },

  intent: ({ DOM }) => {
    const input  = DOM.select('input')
    const button = DOM.select('button')
    const focus$ = input.events('focus').mapTo(true)
    const blur$  = input.events('blur').mapTo(false)

    return {
      FOCUS: xs.merge(focus$, blur$),
      INPUT: input.events('input').map(e => e.target.value),
      CLEAR: button.events('click')
    }
  },

  calculated: {
    filtered: (state) => VALUES.filter(filterBooks(state))
  },

  view: ({ state }) => {
    const { filtered=[], typing } = state
    const list = filtered.length
      ? filtered.map(({ value, label }) => (<li key={ value }>{ label }</li>))
      : (<li>No results</li>)

    return (
      <div className="search">
        <input type="text" value={ typing===true ? null : state.value } placeholder='Search' />
        <button>Clear</button>
        { filtered.length < VALUES.length && <span>{ filtered.length } title{ filtered.length !== 1 && 's' } found</span> }
        <ul>{ list }</ul>
      </div>
    )
  }
})

function filterBooks(state) {
  return ({ label }) => label.toLowerCase().includes(state.value?.toLowerCase())
}