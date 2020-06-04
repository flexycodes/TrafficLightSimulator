'use strict'

import {_fn_traficForm as fn_tf} from './functions.js'

// Function Excute All Actions
let eventListenters = () => {

    const Start_SimulationSubmit  = document.getElementById("Start_Simulation")

    // Traffic Form Submit
    Start_SimulationSubmit.addEventListener('click', fn_tf);
}

// Run All actions in Function eventListenters()
document.addEventListener('DOMContentLoaded', (event) => {
    return eventListenters()
})

