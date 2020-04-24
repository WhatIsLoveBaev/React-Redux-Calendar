import moment from 'moment'

import { SELECTED_MONTH } from '../Actions'

export default function selectedMonth(state = moment(), action) {
    if (action.type === SELECTED_MONTH) {
        return action.payload
    } else return state
}