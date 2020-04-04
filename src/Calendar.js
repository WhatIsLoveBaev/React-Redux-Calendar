import React from 'react'
import moment from 'moment'
/* import 'moment/locale/ru' */

import Events from './Events'
import Week from './Week'
import DayNames from './DayNames'

import './App.css'
import Plus from './plus.svg'
import arrowLeft from './arrow_left.svg'
import arrowRight from './arrow_right.svg'

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

        this.previous = this.previous.bind(this)
        this.next = this.next.bind(this)
        this.addEvent = this.addEvent.bind(this)
        this.showEvents = this.showEvents.bind(this)
        this.showCalendar = this.showCalendar.bind(this)
        this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this)
        this.takeValues = this.takeValues.bind(this)
        console.log(this.state.selectedMonthEvents)
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
    previous() {
        const currentMonthView = this.state.selectedMonth
        this.setState({ selectedMonth: currentMonthView.subtract(1, 'month')})
    }
    next() {
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
    goToCurrentMonthView() {
        this.setState({selectedMonth: moment()})
    }
    showCalendar() {
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
            showEvents: false,
            createEvent: false,
        })
    }
    showEvents() {
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedDay: this.state.selectedDay,
            showEvents: true,
            createEvent: false,
        })
    }
    renderMonthLabel() {
        const state = this.state.selectedMonth
        let current = state.format('MMMM YYYY')
        return (
            <span className='box month-label'>
                {current}
            </span>
        )
    }
    renderDayLabel() {
        const state = this.state.selectedDay
        let current = state.format('DD MMMM YYYY')
        return (
            <span className='box month-label'>
                {current}
            </span>
        )
    }
    renderTodayLabel() {
        return (
            <span className='box today-label' onClick={this.goToCurrentMonthView}>
                Сегодня
            </span>
        )
    }
    renderWeeks() {
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
    addEvent() {
        const currentSelectedDate = this.state.selectedDay
        const createEvent = this.state.createEvent
        let isAfterDay = moment().startOf('day').subtract(1, 'd')

        if (currentSelectedDate.isAfter(isAfterDay)) {
           this.setState({ createEvent: !createEvent })
        } else {
            if (window.confirm('Вы хотите создать событие в прошлом?')) {
                this.setState({ createEvent: !createEvent })
            }
        }
    }
    removeEvent(i) {
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
    editEvent(i) {
        const monthEvents = this.state.selectedMonthEvents
        const idx = i

        for (let i=0; i<monthEvents.length; i++) {
            monthEvents[idx].dynamic = true
        }
        this.setState({monthEvents : monthEvents}) 
    }
    takeValues() {
        let name = this.inputName.value;
        let hours = this.inputHours.value;
        let minutes = this.inputMinutes.value;
        let people = this.inputPeople.value;
        let description = this.inputDescription.value;

        const monthEvents = this.state.selectedMonthEvents
        const currentSelectedDate = this.state.selectedDay
    
        const newEvents = []

        if (
            (name.length === 0) ||
            (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) ||
            (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0)) {

            if (name.length === 0) {
                document.getElementById('eventName').style.border = '1px solid red'
                setTimeout(() => {
                    document.getElementById('eventName').style.border = '1px solid white'
                }, 1500)
            }
    
            if (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) {
                document.getElementById('timeHours').style.border = '1px solid red'
                setTimeout(() => {
                    document.getElementById('timeHours').style.border = '1px solid white'
                }, 1500)
            }
    
            if (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0) {
                document.getElementById('timeMinutes').style.border = '1px solid red'
                setTimeout(() => {
                    document.getElementById('timeMinutes').style.border = '1px solid white'
                }, 1500)
            }
        } 
        else {
            let newEvent = {
                title:  name,
                time: `${hours}:${minutes}`,
                people: people,
                description: description,
                date: currentSelectedDate,
                dynamic: false
            }
            newEvents.push(newEvent)

            for (let i=0; i< newEvents.length; i++) {
                monthEvents.push(newEvents[i])
            }
            this.setState({ 
                selectedMonthEvents: monthEvents,
                createEvent: false
            })
            localStorage.setItem('CalendarEvents', JSON.stringify(monthEvents));
        }
    }
    updateData = (events) => {
        this.setState({ selectedMonthEvents: events })
        localStorage.setItem('CalendarEvents', JSON.stringify(events));
     }


    render() {
        const showEvents = this.state.showEvents
        const createEvent = this.state.createEvent

         if (createEvent) {
                return (
                    <div className='calendar_container'>
                    <section className='main-calendar'>
                        <header className='calendar-header'>
                            <div className='row title-header'>
                                {this.renderDayLabel()}
                            </div>
                            <div className='row button-container'>
                                <div className='svg_wrap plus_svg' onClick={this.showEvents}><img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" /></div>
                            </div>
                        </header>

                        <div className='create_event_container'>

                            <div className='event_name'>
                                <label>Название события:</label>
                                <input 
                                style={{width: '35%'}} 
                                id='eventName' type='text' 
                                className='event_input animError event_title_label' 
                                placeholder='Покупки' 
                                ref={ref => this.inputName = ref}
                                />
                            </div>
        
                            <div className='event_time'>
                                <label>Время события:</label>
                                <input 
                                style={{width: '5%'}} 
                                type='text'
                                className='event_input animError event_title_label' 
                                id='timeHours' 
                                maxLength='2' 
                                placeholder='12'
                                ref={ref => this.inputHours = ref}
                                />
                                <span>:</span>
                                <input 
                                style={{width: '5%'}} 
                                type='text' 
                                className='event_input animError event_title_label'
                                maxLength='2' 
                                placeholder='00'
                                id='timeMinutes' 
                                ref={ref => this.inputMinutes = ref}
                                />
                            </div>
        
                            <div className='event_people'>
                                <label>Участники:</label>
                                <input 
                                type='text' 
                                id='people' 
                                className='event_input event_title_label' 
                                placeholder='Иван, Пётр'
                                ref={ref => this.inputPeople = ref}
                                />
                            </div>
        
                            <div className='event_description'>
                                <label>Описание:</label>
                                <input 
                                type='text' 
                                id='description' 
                                className='event_input event_title_label' 
                                placeholder='Купить хлеба и молока'
                                ref={ref => this.inputDescription = ref}
                                />
                            </div>
        
                            <button onClick={this.takeValues} className='event_button'>Создать событие</button>
                        </div>
                    </section>
                    </div>
                )
        }
        if (showEvents) {
            return (
                <div className='calendar_container'>
                    <section className='main-calendar'>
                        <header className='calendar-header'>
                            <div className='row title-header'>
                                {this.renderDayLabel()}
                            </div>
                            <div className='button-container'>
                                <div className='svg_wrap plus_svg' onClick={this.showCalendar}><img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" /></div>
                                <div className='svg_wrap plus plus_svg' onClick={this.addEvent}><img className='plus_svg' src={Plus} alt="plus" /></div>
                            </div>
                        </header>
                        <Events 
                            selectedMonth={this.state.selectedMonth}
                            selectedDay={this.state.selectedDay}
                            selectedMonthEvents={this.state.selectedMonthEvents}
                            removeEvent={i => this.removeEvent(i)}
                            editEvent={i => this.editEvent(i)}
                            updateData={this.updateData}
                        />
                    </section>
                </div>
            )
        } else {
            return (
                <div className='calendar_container'>
                    <section className='main-calendar'>
                        <header className='calendar-header'>
                            <div className='row title-header'>
                                <span className='box arrow-left' onClick={this.previous}><img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" /></span>
                                <div className='box header-text'>
                                    {this.renderTodayLabel()}
                                    {this.renderMonthLabel()}
                                </div>
                                <span className='box arrow-right' onClick={this.next}><img className='plus_svg arrow_back' src={arrowRight} alt="arrowBack" /></span>
                            </div>
                            <DayNames />
                        </header>
                        <div className='days-container'>
                            {this.renderWeeks()}
                        </div>
                    </section>
                </div>
            )
        }
    }
}