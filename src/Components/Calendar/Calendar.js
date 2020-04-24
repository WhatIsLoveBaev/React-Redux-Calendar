import React from 'react'
import { connect } from 'react-redux'

import { 
    ShowCalendarContainer, 
    ShowEventsContainer, 
    CreateEventContainer } 
from '../../Containers'

import '../../Styles/App.css'

const Calendar = props => {

    const { showEventsState, createEventState } = props

   if (createEventState) return <CreateEventContainer />
   
   if (showEventsState) return <ShowEventsContainer />
   
   else return <ShowCalendarContainer />
}

function mapStateToProps(state) {
    return {
        showEventsState: state.showEvents,
        createEventState: state.createEvent
    } 
}

export default connect(mapStateToProps)(Calendar)