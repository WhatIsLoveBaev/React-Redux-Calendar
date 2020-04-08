import React from 'react'

export default class DayNames extends React.Component {
    render() {
        return (
            <div className='row days-header'>
                <span className='box day-name'>Пн</span>
                <span className='box day-name'>Вт</span>
                <span className='box day-name'>Ср</span>
                <span className='box day-name'>Чт</span>
                <span className='box day-name'>Пт</span>
                <span className='box day-name'>Сб</span>
                <span className='box day-name'>Вс</span>
            </div>
        )
    }
}
