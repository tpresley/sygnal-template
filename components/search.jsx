'SEARCH COMPONENT'

const VALUES = [
  { value: '1', label: 'The Great Gatsby' },
  { value: '2', label: 'Moby Dick' },
  { value: '3', label: 'The Odessey' },
  { value: '4', label: 'Of Mice and Men' },
  { value: '5', label: 'Lord of the Flies' },
  { value: '6', label: 'Ender\'s Game' },
  { value: '7', label: 'Old Man and the Sea'}
]

export default function SEARCH({ state }) {
  const { filtered=[], typing } = state
  const list = filtered.length
    ? filtered.map(({ value, label }) => (<li key={ value }>{ label }</li>))
    : (<li>No results</li>)

  return (
    <div className="search">
      <input type="text" value={ state.value } placeholder='Search' />
      <button>Clear</button>
      { filtered.length < VALUES.length && <span>{ filtered.length } title{ filtered.length !== 1 && 's' } found</span> }
      <ul>{ list }</ul>
    </div>
  )
}

SEARCH.model = {
  BOOTSTRAP: () => ({ value: '' }),
  INPUT: (state, data) => ({ ...state, value: data }),
  CLEAR: (state, data) => ({ ...state, value: '' })
}

SEARCH.intent = ({ DOM }) => {
  return {
    INPUT: DOM.input('input').map(e => e.target.value),
    CLEAR: DOM.click('button')
  }
}

SEARCH.calculated = {
  filtered: (state) => VALUES.filter(filterBooks(state))
}

function filterBooks(state) {
  return ({ label }) => label.toLowerCase().includes(state.value?.toLowerCase())
}