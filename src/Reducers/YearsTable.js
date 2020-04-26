import { YEARS_TABLE } from '../Actions'

export default function yearsTable(state = false, action) {
    if (action.type === YEARS_TABLE) {
        return action.payload
    } else return state
}