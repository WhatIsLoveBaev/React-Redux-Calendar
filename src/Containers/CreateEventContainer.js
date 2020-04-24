import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { showEvents, createEvent, addEvent } from '../Actions'
import CreateEvent from '../Components/Events/CreateEvent'

class CreateEventContainer extends React.Component {

    inputName = React.createRef()
    inputHours = React.createRef()
    inputMinutes = React.createRef()
    inputPeople = React.createRef()
    inputDescription = React.createRef()

    takeValues = () => {
        let name = this.inputName.current.value
        let hours = this.inputHours.current.value
        let minutes = this.inputMinutes.current.value
        let people = this.inputPeople.current.value
        let description = this.inputDescription.current.value

        let nameRed = this.inputName.current
        let hoursRed = this.inputHours.current
        let minutesRed = this.inputMinutes.current

        const { selectedDay, addEvent, createEvent, } = this.props
        const newId = Date.now()

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
            
            let newEvent = {
                id: newId,
                title: name,
                time: timeEd,
                people: people,
                description: description,
                date: selectedDay,
                dynamic: false
            }
            addEvent(newEvent)
            createEvent(false)
        }
    }
    renderDayLabel = () => {
        const { selectedDay } = this.props
        let dayLabel = moment(selectedDay).format('DD MMMM YYYY')
        const current = dayLabel.slice(0, 3) + dayLabel.slice(3, 4).toUpperCase() + dayLabel.slice(4)
        return (
            <span className='box month-label'>
                {current}
            </span>
        )
    }
    showEvents = () => {
        this.props.showEvents(true)
        this.props.createEvent(false)
    }

    render() {
        return <CreateEvent 
        takeValues={this.takeValues}
        renderDayLabel={this.renderDayLabel}
        showEvents={this.showEvents}

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
        selectedDay: state.selectedDay
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showEvents: payload => dispatch(showEvents(payload)),
        createEvent: payload => dispatch(createEvent(payload)),
        addEvent: payload => dispatch(addEvent(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventContainer)