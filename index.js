// import the run function for starting the app
import { run } from 'sygnal';
// import the root component
import App from './app';

// start the app using Sygnal's run() function
// - provides default drivers (sources and sinks) for:
//   - STATE
//   - DOM
//   - EVENTS
//   - LOG
// - additional drivers can be added using the second argument
// - automatically binds to the DOM element with id="root"
// - the mount point can be changed using the 'mountPoint' option in the third argument
run(App);
