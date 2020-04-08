import React from 'react'
import moment from 'moment'
/* import 'moment/locale/ru' */

import Week from '../Week'

import { CreateEvent, ShowEvents } from '../Events'

import ShowCalendar from '../ShowCalendar'

import '../../Styles/App.css'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: moment(),
            selectedDay: moment().startOf('day'),
            selectedMonthEvents: [],
            showEvents: false,
            createEvent: false
        }
    }

    componentDidMount() {
        let local = JSON.parse(localStorage.getItem('CalendarEvents'))
        if (local) {
            const monthEvents = this.state.selectedMonthEvents

            let allEvents = []

            local.forEach(function(elem, i) {
                let format = {
                    date: moment(elem.date),
                    title: elem.title,
                    time: elem.time,
                    people: elem.people,
                    description: elem.description,
                    dynamic: elem.dynamic
                }
                allEvents.push(format)

                for (let i=0; i<allEvents.length; i++) {
                    monthEvents.push(allEvents[i])
                }
            }) 
            this.setState({ selectedMonthEvents : allEvents});
        }
    }
    previous = () => {
        const currentMonthView = this.state.selectedMonth
        this.setState({ selectedMonth: currentMonthView.subtract(1, 'month')})
    }
    next = () => {
        const currentMonthView = this.state.selectedMonth
        this.setState({ selectedMonth: currentMonthView.add(1, 'month')})
    }
    select(day) {
        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            showEvents: true
        })
    }
    goToCurrentMonthView = () => {
        this.setState({selectedMonth: moment()})
    }
    showCalendar = () => {
        const monthEvents = this.state.selectedMonthEvents
        monthEvents.forEach((event) => {
            if (event.dynamic) {
                event.dynamic = false
            }
        })

        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
            showEvents: false,
            createEvent: false,
        })
    }
    showEvents = () => {
        clearTimeout()
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
            showEvents: true,
            createEvent: false,
        })
    }
    renderMonthLabel = () => {
        const state = this.state.selectedMonth
        let current = state.format('MMMM YYYY')
        return (
            <span className='box month-label'>
                {current}
            </span>
        )
    }
    renderDayLabel = () => {
        const state = this.state.selectedDay
        let current = state.format('DD MMMM YYYY')
        return (
            <span className='box month-label'>
                {current}
            </span>
        )
    }
    renderTodayLabel = () => {
        return (
            <span className='box today-label' onClick={this.goToCurrentMonthView}>
                Сегодня
            </span>
        )
    }
    renderWeeks = () => {
        const currentMonthView = this.state.selectedMonth
        const currentSelectedDay = this.state.selectedDay
        const monthEvents = this.state.selectedMonthEvents

        let weeks = []
        let done = false
        let previousCurrentNextView = currentMonthView
            .clone()
            .startOf('month')
            .subtract(1, 'd')
            .day('Monday').locale('ru')
        let count = 0
        let monthIndex = previousCurrentNextView.month()

        while (!done) {
            weeks.push(
                <Week 
                    previousCurrentNextView={previousCurrentNextView.clone()}
                    currentMonthView={currentMonthView}
                    monthEvents={monthEvents}
                    selected={currentSelectedDay}
                    select={day => this.select(day)}
                    key={count}
                />
            )
            previousCurrentNextView.add(1, 'w')
            done = count++ > 2 && monthIndex !==previousCurrentNextView.month()
            monthIndex = previousCurrentNextView.month()
        }
        return weeks
    }
    addEvent = () => {
        const currentSelectedDate = this.state.selectedDay
        const monthEvents = this.state.selectedMonthEvents
        const createEvent = this.state.createEvent
        let isAfterDay = moment().startOf('day').subtract(1, 'd')

        monthEvents.forEach((event) => {
            if (event.dynamic) {
                event.dynamic = false
            }
        })

        if (currentSelectedDate.isAfter(isAfterDay)) {
           this.setState({ createEvent: !createEvent })
        } else {
            if (window.confirm('Вы хотите создать событие в прошлом?')) {
                this.setState({ createEvent: !createEvent })
            }
        }
    }
    removeEvent = (i) => {
        const monthEvents = this.state.selectedMonthEvents.slice()

        if (window.confirm('Вы хотите удалить это событие?')) {
            let index = i

            if (index !== -1) {
                monthEvents.splice(index, 1)
            } else {
                alert('Нет событий для удаления на этот день')
            }

            this.setState({ selectedMonthEvents: monthEvents })
            localStorage.setItem('CalendarEvents', JSON.stringify(monthEvents));
        }
    }
    editEvent = (i) => {
        const monthEvents = this.state.selectedMonthEvents
        const idx = i

        for (let i=0; i<monthEvents.length; i++) {
            monthEvents[idx].dynamic = true
        }
        this.setState({monthEvents : monthEvents}) 
    }
    updateData = (events, close) => {
        this.setState({ 
            selectedMonthEvents: events,
            createEvent: close
            })
        localStorage.setItem('CalendarEvents', JSON.stringify(events));
    }

    
    render() {
        const showEvents = this.state.showEvents
        const createEvent = this.state.createEvent

        if (createEvent) {
            return <CreateEvent 
            renderDayLabel={this.renderDayLabel} 
            showEvents={this.showEvents}
            monthEvents={this.state.selectedMonthEvents}
            currentSelectedDate={this.state.selectedDay}
            updateData={this.updateData}
            />
        }

        if (showEvents) {
            return <ShowEvents 
            renderDayLabel={this.renderDayLabel}
            showCalendar={this.showCalendar}
            addEvent={this.addEvent}
            selectedMonth={this.state.selectedMonth}
            selectedDay={this.state.selectedDay}
            selectedMonthEvents={this.state.selectedMonthEvents}
            removeEvent={i => this.removeEvent(i)}
            editEvent={i => this.editEvent(i)}
            updateData={this.updateData}
            />
        } else {
            return <ShowCalendar 
            previous={this.previous}
            renderTodayLabel={this.renderTodayLabel}
            renderMonthLabel={this.renderMonthLabel}
            next={this.next}
            renderWeeks={this.renderWeeks}
            selectedDay={this.state.selectedDay}
            />
        }
    }
}