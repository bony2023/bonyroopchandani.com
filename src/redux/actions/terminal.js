export const CONSOLE_SAVE_CONSOLE_DATA = "CONSOLE_SAVE_CONSOLE_DATA"


export const saveConsoleData = (data) => {
    return async (dispatch) => {
        dispatch({ type: CONSOLE_SAVE_CONSOLE_DATA, data: data })
    }
}

export default {
    CONSOLE_SAVE_CONSOLE_DATA,

    saveConsoleData,
}