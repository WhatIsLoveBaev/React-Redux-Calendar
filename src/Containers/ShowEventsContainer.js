import React from 'react'
import moment from 'moment'

import { connect } from 'react-redux'
import { showEvents, createEvent } from '../Actions'

import ShowEvents from '../Components/Events/ShowEvents'

class ShowEventsContainer extends React.Component {

    addEvent = () => {
       const { selectedDay, selectedMonthEvents, createEvent } = this.props
       let isAfterDay = moment().startOf('day').subtract(1, 'd')

       selectedMonthEvents.forEach(event => event.dynamic ? event.dynamic = false : '')

       if (moment(selectedDay).isAfter(isAfterDay)) createEvent(true)
       else {
           if (window.confirm('Вы хотите создать событие в прошлом?')) {
               createEvent(true)
           }
       }
   }

   showCalendar = () => {
       const { selectedMonthEvents, showEvents, createEvent} = this.props
       
       selectedMonthEvents.forEach(event => event.dynamic ? event.dynamic = false : '')
       showEvents(false)
       createEvent(false)
   }

   renderDayLabel = () => {
        const state = this.props.selectedDay
        let dayLabel = moment(state).format('DD MMMM YYYY')
        const current = dayLabel.slice(0, 3) + dayLabel.slice(3, 4).toUpperCase() + dayLabel.slice(4)
       return (
           <span className='box month-label'>
               {current}
           </span>
       )
   }

   render() {
       return <ShowEvents 
       renderDayLabel={this.renderDayLabel}
       showCalendar={this.showCalendar}
       addEvent={this.addEvent}
       />
   }
}

function mapStateToProps(state) {
    return {
        selectedDay: state.selectedDay,
        selectedMonthEvents: state.eventReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        showEvents: payload => dispatch(showEvents(payload)),
        createEvent: payload => dispatch(createEvent(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEventsContainer)