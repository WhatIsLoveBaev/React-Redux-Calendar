import React from 'react'
import moment from 'moment'

import arrowLeft from '../../Svg/arrow_left.svg'

export default class CreateEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedMonthEvents: [],
            createEvent: true
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            const btn = () => this.props.updateData(this.state.selectedMonthEvents, this.state.createEvent)
            btn()
        }
    }

    takeValues = () => {
        let name = this.inputName.value
        let hours = this.inputHours.value
        let minutes = this.inputMinutes.value
        let people = this.inputPeople.value
        let description = this.inputDescription.value

        let nameRed = this.inputName
        let hoursRed = this.inputHours
        let minutesRed = this.inputMinutes

        const monthEvents = this.state.selectedMonthEvents
        const currentSelectedDate = this.props.currentSelectedDate
    
        const newEvents = []

        if (
            (name.length === 0) ||
            (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) ||
            (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0)) {

            if (name.length === 0) {
                nameRed.classList.add('errorBorder')
                setTimeout(() => {
                    nameRed.classList.remove('errorBorder')
                }, 1000)
            }
    
            if (isNaN(parseInt(hours)) || parseInt(hours) > 23 || hours.length === 0) {
                hoursRed.classList.add('errorBorder')
                setTimeout(() => {
                    hoursRed.classList.remove('errorBorder')
                }, 1000)
            }
    
            if (isNaN(parseInt(minutes)) || parseInt(minutes) > 59 || minutes.length === 0) {
                minutesRed.classList.add('errorBorder')
                setTimeout(() => {
                    minutesRed.classList.remove('errorBorder')
                }, 1000)
            }
        } 
        else {
            let newEvent = {
                title: name,
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

    render() {
        return (
            <div className='calendar_container'>
            <section className='main-calendar'>
                <header className='calendar-header'>
                    <div className='row title-header'>
                        {this.props.renderDayLabel()}
                    </div>
                    <div className='row button-container'>
                        <div className='svg_wrap plus_svg' onClick={this.props.showEvents}>
                            <img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" />
                            </div>
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
}




