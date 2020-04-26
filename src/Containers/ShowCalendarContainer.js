import React from 'react'
import moment from 'moment'
import 'moment/locale/ru'

import { connect } from 'react-redux'
import { selectedMonth, selectedDay, showEvents, yearsTable, monthsTable } from '../Actions'

import Week from '../Components/Week'
import { ShowCalendar, YearsTable, MonthsTable } from '../Components/ShowCalendar'

class ShowCalendarContainer extends React.Component {

    previous = () => {
        const { selectedMonth, monthSelection} = this.props
        const prev = moment(selectedMonth).subtract(1, 'month')

        monthSelection(prev)
    }
    next = () => {
        const { selectedMonth, monthSelection} = this.props
        const next = moment(selectedMonth).add(1, 'month')

        monthSelection(next)
    }
    renderTodayLabel = () => {
        return (
            <span className='box today-label' onClick={this.goToCurrentMonthView}>
                Сегодня
            </span>
        )
    }

    renderWeeks = () => {
        const { selectedMonth, selectedDay, selectedMonthEvents } = this.props

        let weeks = []
        let done = false
        let previousCurrentNextView = moment(selectedMonth)
            .clone()
            .startOf('Month')
            .subtract(1, 'd')
            .day(1)
        let count = 0
        let monthIndex = previousCurrentNextView.month()

        while (!done) {
            weeks.push(
                <Week 
                    date={previousCurrentNextView.clone()}
                    selectedMonth={moment(selectedMonth)}
                    monthEvents={selectedMonthEvents}
                    selected={moment(selectedDay)}
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
    select = (day) => {
        const { monthSelection, daySelection, showEvents } = this.props
        monthSelection(day.date)
        daySelection(day.date.clone())
        showEvents(true)
    }
    renderMonthLabel = () => {
        const { selectedMonth } = this.props
        let first = moment(selectedMonth).format('MMMM YYYY').slice(0, 1)
        const current = first.toUpperCase() + moment(selectedMonth).format('MMMM YYYY').slice(1)

        
        return (
            <span className='box month-label' onClick={() => this.props.yearsTable(true)}>
                {current}
            </span>
        )
    }
    goToCurrentMonthView = () => this.props.monthSelection(moment())


    showCalendar = () => {
        this.props.yearsTable(false)
        this.props.monthsTable(false)
        this.props.monthSelection(moment())
      }

    render() {

        if (this.props.yearsTableState === true) {

            return <YearsTable 
            monthSelection={this.props.monthSelection}
            selectedMonthState={this.props.selectedMonth}
            yearsTable={this.props.yearsTable}
            monthsTable={this.props.monthsTable}
            showCalendar={this.showCalendar}
            />
        } else if (this.props.monthsTableState === true) {

            return <MonthsTable 
            monthsTable={this.props.monthsTable} 
            selectedMonthState={this.props.selectedMonth}
            monthSelection={this.props.monthSelection}
            showCalendar={this.showCalendar}
            />
        } else {
            
            return <ShowCalendar 
            previous={this.previous}
            renderTodayLabel={this.renderTodayLabel}
            renderMonthLabel={this.renderMonthLabel}
            next={this.next}
            renderWeeks={this.renderWeeks}
            yearsTable={this.props.yearsTableState}
            years={this.YearTable}
            />
        }

        
    }
}

function mapStateToProps(state) {
    return {
        selectedMonth: state.selectedMonth,
        selectedDay: state.selectedDay,
        selectedMonthEvents: state.eventReducer,
        yearsTableState: state.yearsTable,
        monthsTableState: state.monthsTable
    }
}

function mapDispatchToProps(dispatch) {
    return {
        monthSelection: payload => dispatch(selectedMonth(payload)),
        daySelection: payload => dispatch(selectedDay(payload)),
        showEvents: payload => dispatch(showEvents(payload)),
        yearsTable: payload => dispatch(yearsTable(payload)),
        monthsTable: payload => dispatch(monthsTable(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCalendarContainer)