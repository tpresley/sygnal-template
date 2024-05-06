'CLOCK COMPONENT'

import { xs, classes } from "sygnal";

import Digit from "./digit";

const DIGIT_SKEW    = '-7deg'
const TRANSITION    = '100ms'
const DISPLAY_FILL  = '#AAA'

export default function CLOCK({ state }) {
  const { hour, pulse } = state;

  const flashingColon = (<div className={ classes({ off: !pulse }) }>:</div>)

  return (
    <div className="clock container">
      <collection of={ Digit } from="hourDigits" fill={ DISPLAY_FILL } skew={ DIGIT_SKEW } transition={ TRANSITION } className='hour' />
      { flashingColon }
      <collection of={ Digit } from="minuteDigits" fill={ DISPLAY_FILL } skew={ DIGIT_SKEW } transition={ TRANSITION } className='minute' />
      <span>{ hour > 11 ? 'PM' : 'AM' }</span>
    </div>
  )
}

CLOCK.model = {
  TICK: (state) => {
    const newTime = new Date()
    return {
      ...state,
      time:  newTime,
      hour:  newTime.getHours(),
      minute: newTime.getMinutes(),
      // toggle the pulse state (used to flash the colon)
      pulse: !state.pulse
    }
  }
}

CLOCK.intent = () => ({ TICK: xs.periodic(1000).startWith(null) })

CLOCK.calculated = {
  hourDigits:   (state) => makeDigits(state.hour % 12),
  minuteDigits: (state) => makeDigits(state.minute),
}


function makeDigits(number) {
  if (number === 0) number = 12 
  return (number || '0').toString()
    .padStart(2, '0')
    .split('')
}
