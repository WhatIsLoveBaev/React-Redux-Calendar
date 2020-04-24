import { CREATE_EVENT } from '../Actions'

export default function createEvent(state = false, action) {
    if (action.type === CREATE_EVENT) {
        return action.payload
    } else return state
}