import moment from 'moment'

import { SELECTED_DAY } from '../Actions'

export default function selectedDay(state = moment().startOf('day'), action) {
    if (action.type === SELECTED_DAY) {
        return action.payload
    } else return state

}