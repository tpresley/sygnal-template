import { component } from 'sygnal'

export default component({

  initialState: {
    count: 0
  },

  model: {
    INCREMENT: (state, data) => ({ ...state, count: (state.count || 0) + data })
  },

  intent: ({ DOM }) => {

    const inc$ = DOM.select('document').events('click').mapTo(1)

    return {
      INCREMENT: inc$
    }
  },

  view: ({ state }) => {

    return (
      <h1>Count { state.count }</h1>
    )
  }
})