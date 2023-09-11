import { component, xs, classes } from "sygnal";

import Digit from "./digit";

const DIGIT_SKEW    = '-7deg'
const TRANSITION    = '100ms'
const DISPLAY_FILL  = '#AAA'

export default component({
  name: 'CLOCK',

  model: {
    TICK: (state) => ({
      ...state,
      time:  new Date(),
      // toggle the pulse state (used to flash the colon)
      pulse: !state.pulse
    })
  },

  intent: () => ({ TICK: xs.periodic(1000) }),

  calculated: {
    hour:   (state) => state.time?.getHours(),
    minute: (state) => state.time?.getMinutes(),
  },

  view: ({ state }) => {
    const { hour, minute, pulse } = state;

    const makeDigits = (value) => (value || '0')
      .toString()
      .padStart(2, '0')
      .split('')
      .map((digit, i) => (<Digit key={ i } value={ digit } fill={ DISPLAY_FILL } skew={ DIGIT_SKEW } transition={ TRANSITION } />))

    const flashingColon = (<div className={ classes({ off: !pulse }) }>:</div>)

    return (
      <div className="clock container">
        { makeDigits(hour % 12) } { flashingColon } { makeDigits(minute) } <span>{ hour > 11 ? 'PM' : 'AM' }</span>
      </div>
    )
  }
})