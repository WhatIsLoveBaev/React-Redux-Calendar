export const ADD_EVENT = 'ADD_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const SAVE_EVENT = 'SAVE_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const SHOW_EVENTS = 'SHOW_EVENTS'
export const CREATE_EVENT = 'CREATE_EVENT'
export const SELECTED_MONTH = 'SELECTED_MONTH'
export const SELECTED_DAY = 'SELECTED_DAY'


export function addEvent(payload) {
    return {
        type: ADD_EVENT,
        payload
    }
}

export function deleteEvent(id) {
    return {
        type: DELETE_EVENT,
        id
    }
}

export function editEvent(id) {
    return {
        type: EDIT_EVENT,
        id
    }
}

export function saveEvent(payload) {
    return {
        type: SAVE_EVENT,
        payload
    }
}

export function selectedMonth(payload) {
    return {
        type: SELECTED_MONTH,
        payload
    }
}

export function selectedDay(payload) {
    return {
        type: SELECTED_DAY,
        payload
    }
}

export function showEvents(payload) {
    return {
        type: SHOW_EVENTS,
        payload
    }
}

export function createEvent(payload) {
    return {
        type: CREATE_EVENT,
        payload
    }
}