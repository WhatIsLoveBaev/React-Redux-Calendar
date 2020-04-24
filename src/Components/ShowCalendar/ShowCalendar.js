import React from 'react'

import { DayNames } from '../Days'

import arrowLeft from '../../Svg/arrow_left.svg'
import arrowRight from '../../Svg/arrow_right.svg'

const ShowCalendar = props => {
    return (
        <div className='calendar_container'>
            <section className='main-calendar'>
                <header className='calendar-header'>
                    <div className='row title-header'>
                        <span className='box arrow-left' onClick={props.previous}><img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" /></span>
                        <div className='box header-text'>
                            {props.renderTodayLabel()}
                            {props.renderMonthLabel()}
                        </div>
                        <span className='box arrow-right' onClick={props.next}><img className='plus_svg arrow_back' src={arrowRight} alt="arrowBack" /></span>
                    </div>
                    <DayNames />
                </header>
                <div className='days-container'>
                    {props.renderWeeks()}
                </div>
            </section>
        </div>
    )
}
export default ShowCalendar


