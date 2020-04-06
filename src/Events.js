import React from 'react'
import Trash from './trash.svg'
import Edit from './edit.svg'

export default class Events extends React.Component {
        state = {
            monthEvents: ''
        }

        editValues = () => {
            let name = this.inputName.value;
            let hours = this.inputHours.value;
            let minutes = this.inputMinutes.value;
            let people = this.inputPeople.value;
            let description = this.inputDescription.value;
    
            const monthEvents = this.props.selectedMonthEvents 
        
            if (
                (name.length === 0) ||
                (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) ||
                (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0)) {
    
                if (name.length === 0) {
                    document.getElementById('eventName').style.border = '1px solid red'
                    setTimeout(() => {
                        document.getElementById('eventName').style.border = '1px solid white'
                        document.getElementById('eventName').style.borderBottom = '1px solid #4B0082'
                    }, 1500)
                }
        
                if (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) {
                    document.getElementById('timeHours').style.border = '1px solid red'
                    setTimeout(() => {
                        document.getElementById('timeHours').style.border = '1px solid white'
                        document.getElementById('timeHours').style.borderBottom = '1px solid #4B0082'
                    }, 1500)
                }
        
                if (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0) {
                    document.getElementById('timeMinutes').style.border = '1px solid red'
                    setTimeout(() => {
                        document.getElementById('timeMinutes').style.border = '1px solid white'
                        document.getElementById('timeMinutes').style.borderBottom = '1px solid #4B0082'
                    }, 1500)
                }
                
            } 
            else {
                monthEvents.map((event, i) => {
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
                        style={{width: '28%', border: '0', borderBottom: '1px solid #4B0082', fontWeight: 'normal', margin: '0 auto', textAlign: 'center', color: 'black'}} 
                        id='eventName' type='text' 
                        className='event_title_label animError' 
                        defaultValue={event.title}
                        ref={ref => this.inputName = ref}
                        onChange={this.editValues}
                        />

                        <div className='event_info_wrapper'>
                            <div>
                                <div className='event_time_label event_info' style={{display: 'block', width: '90%'}}>
                                    <span style={{color: 'black', display: 'block'}}>Время: </span>

                                    <input 
                                    style={{width: '9%', textAlign: 'center', color: 'black', border: '0', borderBottom: '1px solid #4B0082'}} 
                                    type='text'
                                    className='event_time_label animError' 
                                    id='timeHours' 
                                    maxLength='2' 
                                    defaultValue={'12'}
                                    ref={ref => this.inputHours = ref}
                                    onChange={this.editValues}
                                    />
                                    <span>:</span>
                                    <input 
                                    style={{width: '9%', textAlign: 'center', border: '0', borderBottom: '1px solid #4B0082', color: 'black'}} 
                                    type='text' 
                                    className='event_time_label animError'
                                    maxLength='2' 
                                    defaultValue={'00'}
                                    id='timeMinutes' 
                                    ref={ref => this.inputMinutes = ref}
                                    onChange={this.editValues}
                                    />

                                    </div>
                            </div>
                            <div>
                                <div className='event_people_label event_info'>
                                    <span style={{color: 'black'}}>Участники: </span>

                                    <input 
                                    type='text' 
                                    id='people'
                                    style={{width: '65%', border: '0', borderBottom: '1px solid #4B0082', textAlign: 'center', color: 'black'}}
                                    className='event_people_label' 
                                    defaultValue={event.people}
                                    ref={ref => this.inputPeople = ref}
                                    onChange={this.editValues}
                                    />

                                </div>
                            </div> 
                        </div>
                        <div className='event_description_label' style={{marginTop: '10px', textAlign: 'center'}}>
                            <input 
                            type='text' 
                            id='description' 
                            className='event_description_label' 
                            style={{border: '0', borderBottom: '1px solid #4B0082', color: 'black'}}
                            defaultValue={event.description}
                            ref={ref => this.inputDescription = ref}
                            onChange={this.editValues}
                            />             
                        </div>
                        <button onClick={() => this.props.updateData(this.state.monthEvents)} className='event_button'>Сохранить</button>
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
                                <div className='event_time_label'><span style={{color: 'black', display: 'block'}}>Время: </span>{event.time}</div>
                            </div>
                            <div className='event_info'>
                                <div className='event_people_label'><span style={{color: 'black', display: 'block'}}>Участники: </span>{event.people}</div>
                            </div> 
                        </div>
                        <div className='event_description_label'><span style={{color: 'black', display: 'block'}}>Описание: </span>{event.description}</div>
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
