import {
    CONSOLE_SAVE_CONSOLE_DATA
} from "../actions/terminal"

let defaultState = {
    caretRightPosition: -11,
    caretSelected: true,
    currentTextEnterted: "",
    lastCommand: "",
    buffer: [
        "Type \"help(bony)\" for more information.",
        ">>> import bony"
    ]
}

const terminal = (state = defaultState, action) => {
    switch (action.type) {
        case CONSOLE_SAVE_CONSOLE_DATA: {
            return Object.assign({}, state, action.data)
        }
        default: {
            return state
        }
    }
}

export default {
    terminal,
}