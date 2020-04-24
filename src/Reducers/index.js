import { combineReducers } from 'redux'

import eventReducer from './EventReducer'
import selectedMonth from './SelectedMonth'
import selectedDay from './SelectedDay'
import showEvents from './ShowEvents'
import createEvent from './CreateEvent'

export default combineReducers({
    eventReducer,
    selectedMonth,
    selectedDay,
    showEvents,
    createEvent
})