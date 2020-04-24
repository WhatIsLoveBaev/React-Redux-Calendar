import React from 'react'

import arrowLeft from '../../Svg/arrow_left.svg'


const CreateEvent = props => {

    const { inputName, inputHours, inputMinutes, inputPeople, inputDescription } = props

        return (
            <div className='calendar_container'>
            <section className='main-calendar'>
                <header className='calendar-header'>
                    <div className='row title-header'>
                        {props.renderDayLabel()}
                    </div>
                    <div className='row button-container'>
                        <div className='svg_wrap plus_svg' onClick={props.showEvents}>
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
                        ref={inputName}
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
                        ref={inputHours}
                        />
                        <span>:</span>
                        <input 
                        style={{width: '5%'}} 
                        type='text' 
                        className='event_input animError event_title_label'
                        maxLength='2' 
                        placeholder='00'
                        id='timeMinutes' 
                        ref={inputMinutes}
                        />
                    </div>

                    <div className='event_people'>
                        <label>Участники:</label>
                        <input 
                        type='text' 
                        id='people' 
                        className='event_input event_title_label' 
                        placeholder='Иван, Пётр'
                        ref={inputPeople}
                        />
                    </div>

                    <div className='event_description'>
                        <label>Описание:</label>
                        <input 
                        type='text' 
                        id='description' 
                        className='event_input event_title_label' 
                        placeholder='Купить хлеба и молока'
                        ref={inputDescription}
                        />
                    </div>

                    <button onClick={props.takeValues} className='event_button'>Создать событие</button>
                </div>
            </section>
            </div>
        )
    }

export default CreateEvent
