'use strict'

//Import class UI
import {UI} from './class-ui.js'

// new instance of UI Class
let ui = new UI()

// Function to submit Traffic Form
let _fn_traficForm = (event) => {
    event.preventDefault()
    ui.submitTrafficForm()
}

// Export all functions
export {_fn_traficForm}