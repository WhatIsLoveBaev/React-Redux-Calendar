import React from 'react'

const Day = props => {

    let day = props.day
    let selected = props.selected
    let select = props.select

    return (
        <div className={
            'day' +
            (day.isToday ? " today" : '') +
            (day.isCurrentMonth ? '' : ' different-month') +
            (day.date.isSame(selected) ? ' selected' : '') + 
            (day.hasEvents ? ' has-events' : '')
        } onClick={() => select(day)} >
            <div className='day-number'>{day.number}</div>
        </div>
        )
}
export default Day