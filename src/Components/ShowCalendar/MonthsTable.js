import React from 'react';
import moment from 'moment'

import arrowLeft from '../../Svg/arrow_left.svg'

const MonthsTable = props => {

  const { monthSelection, monthsTable, selectedMonthState, showCalendar } = props
  let months = moment.months()
  let arrayMonths = []

  const setMonth = month => {

    let dateObject = Object.assign({}, selectedMonthState)
    dateObject = moment(dateObject).set("month", month)

    monthSelection(dateObject)
    monthsTable(false)
    }

    months.forEach(month => {
      arrayMonths.push(
        <div key={month} className="years_wrap">
          <span className='month' onClick={() => setMonth(month)} >{month}</span>
        </div>
      )
    })

    let rows = []
    let cells = []
      
    arrayMonths.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = []
        cells.push(row)
        }
    })
    rows.push(cells)
    let yearList = rows.map((d, i) => {
      return <div key={i}>{d}</div>
    })
      
    return (
      <div className='calendar_container'>
        <section className='main-calendar'>
          <header className='calendar-header'>
            <div className='choose_year'>
              <div className='svg_wrap_years' onClick={showCalendar}>
                <img className='plus_svg arrow_back' src={arrowLeft} alt="arrowBack" />
              </div>
              <span className='select_year'>Выберите месяц</span> 
            </div>
            <div className='row years_wrap month_wrap'>
              {yearList}
            </div>
          </header>
        </section>
      </div>
    )
}
    
export default MonthsTable