import { SHOW_EVENTS } from '../Actions'

export default function showEvents(state = false, action) {
    if (action.type === SHOW_EVENTS) {
        return action.payload
    } else return state
}