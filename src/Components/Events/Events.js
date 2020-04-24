import React from 'react'

import moment from 'moment'

import Trash from '../../Svg/trash.svg'
import Edit from '../../Svg/edit.svg'

const Events = props => {

    const { 
        monthEvents, currentSelectedDay, inputName, inputHours, 
        inputMinutes, inputPeople, inputDescription } = props

    const monthEventsRendered = monthEvents.map((event, i) => {
        const id = event.id
        const hour = event.time.split(':')[0]
        const min = event.time.split(':')[1]

        const Title = () => {
            return (
                <div className='event_title_label'>
                    <img onClick={() => props.editEventDispatch(id)} className='edit_svg' src={Edit} alt="edit" />
                    {event.title}
                    <img onClick={() => props.deleteEvent(id)} className='trash_svg' src={Trash} alt="trash" />
                </div>
            )
        }
        const Time = () => {
            return (
                <div className='event_info'>
                    <div className='event_time_label'>
                        <span className='black_block'>Время: </span>
                        {event.time}
                    </div>
                </div>
            )
        }
        const People = () => {
            if (event.people) {
                return (
                    <div className='event_info'>
                        <div className='event_people_label'><span className='black_block'>Участники: </span>{event.people}</div>
                    </div> 
                )
            }
        }
        const Description = () => {
            if (event.description) {
                return (
                    <div className='event_description_label'>
                        <span className='black_block'>Описание: </span>
                        {event.description}
                    </div>
                )
            }
        }

        const TitleDynamic = () => {
            return <input 
            id='eventName' type='text' 
            className='event_title_label animError eventsInputs' 
            defaultValue={event.title}
            ref={inputName}
            />
        }
        const TimeDynamic = () => {
            return (
                <div>
                    <div className='event_time_label event_info' style={{display: 'block', width: '90%'}}>
                        <span style={{color: 'black', display: 'block'}}>Время: </span>

                        <input type='text' className='event_time_label animError eventsInputs eventsInputsTime' 
                            id='timeHours' 
                            maxLength='2' 
                            defaultValue={hour}
                            ref={inputHours}
                        />
                        <span>:</span>
                        <input 
                            type='text' className='event_time_label animError eventsInputs eventsInputsTime'
                            maxLength='2' 
                            defaultValue={min}
                            id='timeMinutes' 
                            ref={inputMinutes}
                        />
                    </div>
                </div>
            )
        }
        const PeopleDynamic = () => {
            return (
                <div>
                    <div className='event_people_label event_info'>
                        <span style={{color: 'black'}}>Участники: </span>
                        <input 
                            type='text' id='people' style={{width: '65%'}}
                            className='event_people_label eventsInputs' 
                            defaultValue={event.people}
                            ref={inputPeople}
                        />
                    </div>
                </div> 
            )
        }
        const DescriptionDynamic = () => {
            return (
                <div className='event_description_label'>
                    <span style={{color: 'black', display: 'block'}}>Описание: </span>
                    <input 
                        type='text' id='description' className='event_description_label eventsInputs' 
                        defaultValue={event.description}
                        ref={inputDescription}
                    />             
                </div>
            )
        }
        

        if (event.dynamic) {
            return (
                <div key={i} className='event-container' >
                    {TitleDynamic()}

                    <div className='event_info_wrapper'>
                        {TimeDynamic()}
                        {PeopleDynamic()}
                    </div>
                    {DescriptionDynamic()}
                    <button onClick={props.editValues} className='event_button event_save'>Сохранить</button>
                </div>
            )
        } else {
            return (
                <div key={i} className='event-container'>
                    {Title()}
                    <div className='event_info_wrapper'>
                        {Time()}
                        {People()}
                    </div>
                    {Description()}
                </div>
            )
        }

            
    })   
    const dayEventsRendered = []

    for (let i=0; i<monthEventsRendered.length; i++) {
        if (moment(monthEvents[i].date).isSame(currentSelectedDay, 'day')) {
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

export default Events