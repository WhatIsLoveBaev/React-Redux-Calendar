import React from 'react'

import Events from './Events'

import Plus from './plus.svg'
import arrowLeft from './arrow_left.svg'

 const ShowEvents = (props) => {
        return (
            <div className='calendar_container'>
                <section className='main-calendar'>
                    <header className='calendar-header'>
                        <div className='row title-header'>
                            {props.renderDayLabel()}
                        </div>
                        <div className='button-container'>
                            <div className='svg_wrap plus_svg' onClick={props.showCalendar}><img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" /></div>
                            <div className='svg_wrap plus plus_svg' onClick={props.addEvent}><img className='plus_svg' src={Plus} alt="plus" /></div>
                        </div>
                    </header>
                    <Events 
                        selectedMonth={props.selectedMonth}
                        selectedDay={props.selectedDay}
                        selectedMonthEvents={props.selectedMonthEvents}
                        removeEvent={i => props.removeEvent(i)}
                        editEvent={i => props.editEvent(i)}
                        updateData={props.updateData}
                    />
                </section>
            </div>
        )
    }
export default ShowEvents