import React from 'react'

const Day = props => {

    let { day, selected, select } = props

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