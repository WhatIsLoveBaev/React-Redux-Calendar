import React from 'react'
import moment from 'moment'
import { Day } from '../Days'

export default class Week extends React.Component {
    render() {
        let days = []
        let { date, selectedMonth, selected, select, monthEvents } = this.props

        for (var i=0; i<7; i++) {
            let dayHasEvents = false

            for (var j=0; j<monthEvents.length; j++) {
                if (moment(monthEvents[j].date).isSame(date, 'day')) {
                    dayHasEvents = true
                }
            }
            let day = {
                name: date.format('dd').substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === selectedMonth.month(),
                isToday: date.isSame(new Date(), 'day'),
                date: moment(date),
                hasEvents: dayHasEvents
            }
            days.push(<Day key={day.number} day={day} selected={selected} select={select} />)
            date = date.clone()
            date.add(1, 'd')
        }
        return (
            <div className='row week'>
                {days}
            </div>
        )
    }
}
