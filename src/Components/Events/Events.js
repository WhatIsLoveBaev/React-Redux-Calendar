import React from 'react'
import Trash from '../../Svg/trash.svg'
import Edit from '../../Svg/edit.svg'

export default class Events extends React.Component {
        state = {
            monthEvents: ''
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevState !== this.state) {
                const btn = () => this.props.updateData(this.state.monthEvents)
                btn()
            }
        }

        editValues = () => {
            let name = this.inputName.value;
            let hours = this.inputHours.value;
            let minutes = this.inputMinutes.value;
            let people = this.inputPeople.value;
            let description = this.inputDescription.value;
    
            let nameRed = this.inputName
            let hoursRed = this.inputHours
            let minutesRed = this.inputMinutes
    
            const monthEvents = this.props.selectedMonthEvents 
        
            if (
                (name.length === 0) ||
                (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) ||
                (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0)) {
    
                if (name.length === 0) {
                    nameRed.style.border = '1px solid red'
                    setTimeout(() => {
                        nameRed.style.border = '1px solid white'
                        nameRed.style.borderBottom = '1px solid #4B0082'
                    }, 1500)
                }
        
                if (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) {
                    hoursRed.style.border = '1px solid red'
                    setTimeout(() => {
                        hoursRed.style.border = '1px solid white'
                        hoursRed.style.borderBottom = '1px solid #4B0082'
                    }, 1500)
                }
        
                if (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0) {
                    minutesRed.style.border = '1px solid red'
                    setTimeout(() => {
                        minutesRed.style.border = '1px solid white'
                        minutesRed.style.borderBottom = '1px solid #4B0082'
                    }, 1500)
                }
                
            } 
            else {
                monthEvents.forEach((event, i) => {
                    if (event.dynamic) {
        
                        let eventEdit = {
                            title: name,
                            time: `${hours}:${minutes}`,
                            people: people,
                            description: description,
                            date: event.date,
                            dynamic: false
                        }
                        const monthEventsEdit = monthEvents.slice()
                        let index = i
                        
                        event[i] = eventEdit
                        monthEventsEdit.splice(index, 1, event[i])
                        
                         this.setState({ 
                            monthEvents: monthEventsEdit
                        })
                    } 
                }) 
                }
        
        }
        

    render() {
        const currentSelectedDay = this.props.selectedDay
        const monthEvents = this.props.selectedMonthEvents
        const removeEvent = this.props.removeEvent
        const editEvent = this.props.editEvent
        
        const monthEventsRendered = monthEvents.map((event, i) => {
            if (event.dynamic) {
                return (
                    <div key={i} className='event-container' >
                        <input 
                        id='eventName' type='text' 
                        className='event_title_label animError eventsInputs' 
                        defaultValue={event.title}
                        ref={ref => this.inputName = ref}
                        />

                        <div className='event_info_wrapper'>
                            <div>
                                <div className='event_time_label event_info' style={{display: 'block', width: '90%'}}>
                                    <span style={{color: 'black', display: 'block'}}>Время: </span>

                                    <input 
                                    type='text'
                                    className='event_time_label animError eventsInputs eventsInputsTime' 
                                    id='timeHours' 
                                    maxLength='2' 
                                    defaultValue={'12'}
                                    ref={ref => this.inputHours = ref}
                                    />
                                    <span>:</span>
                                    <input 
                                    type='text' 
                                    className='event_time_label animError eventsInputs eventsInputsTime'
                                    maxLength='2' 
                                    defaultValue={'00'}
                                    id='timeMinutes' 
                                    ref={ref => this.inputMinutes = ref}
                                    />

                                    </div>
                            </div>
                            <div>
                                <div className='event_people_label event_info'>
                                    <span style={{color: 'black'}}>Участники: </span>

                                    <input 
                                    type='text' 
                                    id='people'
                                    style={{width: '65%'}}
                                    className='event_people_label eventsInputs' 
                                    defaultValue={event.people}
                                    ref={ref => this.inputPeople = ref}
                                    />

                                </div>
                            </div> 
                        </div>
                        <div className='event_description_label'>
                            <input 
                            type='text' 
                            id='description' 
                            className='event_description_label eventsInputs' 
                            defaultValue={event.description}
                            ref={ref => this.inputDescription = ref}
                            />             
                        </div>
                        <button onClick={this.editValues} className='event_button event_save'>Сохранить</button>
                    </div>
                )
            } else {
                return (
                    <div key={i} className='event-container'>

                        <div className='event_title_label'>
                            <img onClick={() => editEvent(i)} className='edit_svg' src={Edit} alt="edit" />
                            {event.title}
                            <img onClick={() => removeEvent(i)} className='trash_svg' src={Trash} alt="trash" />
                        </div>
                        
                        <div className='event_info_wrapper'>
                            <div className='event_info'>
                                <div className='event_time_label'><span className='black_block'>Время: </span>{event.time}</div>
                            </div>
                            <div className='event_info'>
                                <div className='event_people_label'><span className='black_block'>Участники: </span>{event.people}</div>
                            </div> 
                        </div>
                        <div className='event_description_label'><span className='black_block'>Описание: </span>{event.description}</div>
                    </div>
                )
            }
        })
        const dayEventsRendered = []

        for (let i=0; i<monthEventsRendered.length; i++) {
            if (monthEvents[i].date.isSame(currentSelectedDay, 'day')) {
                dayEventsRendered.push(monthEventsRendered[i])
            }
        }

        if (dayEventsRendered.length === 0) {
            return (
                <div className='events-empty'>
                    {dayEventsRendered}
                </div>
            )
        } else {
            return (
                <div className='day-events'>
                    {dayEventsRendered}
                </div>
            )
        }
    }
}
