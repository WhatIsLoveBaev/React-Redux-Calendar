import React from 'react'
import { connect } from 'react-redux'
import Events from '../Components/Events/Events'

import { editEvent, saveEvent, deleteEvent } from '../Actions'

class EventsContainer extends React.Component {
    
    inputName = React.createRef()
    inputHours = React.createRef()
    inputMinutes = React.createRef()
    inputPeople = React.createRef()
    inputDescription = React.createRef()

    editValues = () => {
        let name = this.inputName.current.value;
        let hours = this.inputHours.current.value;
        let minutes = this.inputMinutes.current.value;
        let people = this.inputPeople.current.value;
        let description = this.inputDescription.current.value;

        let nameRed = this.inputName.current
        let hoursRed = this.inputHours.current
        let minutesRed = this.inputMinutes.current

        const { selectedMonthEvents, saveEvent } = this.props

        function errorStyle(input) {
            input.style.border = '1px solid red'
            setTimeout(() => {
                input.style.border = '1px solid white'
                input.style.borderBottom = '1px solid #4B0082'
            }, 1500)
        }
        let checkName = name.length === 0
        let checkHour = !Number.isInteger(+hours) || +hours > 23 || +hours < 0 || hours.length === 0
        let checkMin = !Number.isInteger(+minutes) || +minutes > 59 || +minutes < 0 || minutes.length === 0
        
        if (checkName || checkHour || checkMin) {
            if (checkName) errorStyle(nameRed)
            
            if (checkHour) errorStyle(hoursRed)
            
            if (checkMin) errorStyle(minutesRed)       
        } else {

            let timeEd = hours.length===1 && minutes.length=== 1 ? `0${hours}:0${minutes}` : 
            hours.length === 1 ? `0${hours}:${minutes}` : 
            minutes.length === 1 ? `${hours}:0${minutes}` : 
            `${hours}:${minutes}`

            selectedMonthEvents.forEach((event, i) => {
                if (event.dynamic === true) {
    
                    let eventEdit = {
                        id: event.id,
                        title: name,
                        time: timeEd,
                        people: people,
                        description: description,
                        date: event.date,
                        dynamic: false
                    }
                    event[i] = eventEdit
                    
                    const monthEventsEdit = selectedMonthEvents.slice()
                    monthEventsEdit.splice(i, 1, event[i])
                    
                    saveEvent(monthEventsEdit)
                }  
            })          
        }
    }

    render() {
        const { selectedDay, selectedMonthEvents} = this.props
        
        return <Events 
                    monthEvents={selectedMonthEvents} 
                    currentSelectedDay={selectedDay}

                    editValues={this.editValues}

                    editEventDispatch={this.props.editEventDispatch}
                    deleteEvent={this.props.deleteEvent}

                    inputName={this.inputName}
                    inputHours={this.inputHours}
                    inputMinutes={this.inputMinutes}
                    inputPeople={this.inputPeople}
                    inputDescription={this.inputDescription}
                />
    }
}

function mapStateToProps(state) {
    return {
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
        selectedMonthEvents: state.eventReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {
        editEventDispatch: id => dispatch(editEvent(id)),
        deleteEvent: id => dispatch(deleteEvent(id)),
        saveEvent: payload => dispatch(saveEvent(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer)