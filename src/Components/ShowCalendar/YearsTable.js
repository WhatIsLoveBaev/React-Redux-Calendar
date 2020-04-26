import React from 'react';
import moment from 'moment'

import arrowLeft from '../../Svg/arrow_left.svg'

const YearTable = props => {

    const { monthSelection, yearsTable, monthsTable, selectedMonthState, showCalendar } = props
    const years = getYears()
    let arrayYears = []

    const setYear = year => {
        let dateObject = Object.assign({}, selectedMonthState);
        dateObject = moment(dateObject).set("year", year);

        monthSelection(dateObject)
        yearsTable(false)
        monthsTable(true)
    }

    function getYears() {
      var dateArray = []
      var startDate = moment().subtract(5, 'year').format('Y')
      
      var stopDate = 
          moment()
          .set('year', moment().format('Y'))
          .add(6, 'year')
          .format("Y")
          
      while (startDate <= stopDate) {
          dateArray.push(startDate)
          startDate++
      }
      return dateArray
  }
    
    years.forEach(year => {
        arrayYears.push(
              <div key={year} className="years_wrap">
                <span className='year' onClick={() => setYear(year)} >{year}</span>
              </div>
            )
          })

          let rows = []
          let cells = []
      
          arrayYears.forEach((row, i) => {
            if (i % 3 !== 0 || i === 0) {
              cells.push(row)
            } else {
              rows.push(cells)
              cells = []
              cells.push(row)
            }
          });
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
                    <span className='select_year'>Выберите год</span> 
                  </div>
                    <div className='row years_wrap'>
                        {yearList}
                    </div>
                </header>
            </section>
        </div>
        )
}
    
export default YearTable