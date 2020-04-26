import { MONTHS_TABLE } from '../Actions'

export default function monthsTable(state = false, action) {
    if (action.type === MONTHS_TABLE) {
        return action.payload
    } else return state
}