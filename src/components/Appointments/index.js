import {Component} from 'react'

import {format} from 'date-fns'

import './index.css'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {inputName: '', inputDate: '', appointmentList: [], isFilterActive: 0}

  onToggledStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  onFilterActive = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputName, inputDate} = this.state
    const formattedDate = inputDate
      ? format(new Date(inputDate), 'dd-mm-yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      name: inputName,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputName: '',
      inputDate: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({inputName: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({inputDate: event.target.value})
  }

  render() {
    const {inputName, inputDate, isFilterActive} = this.state
    const {filterClassName} = isFilterActive ? 'filterFilled' : 'button'
    const FilteredAppointments = this.getFilteredAppointments()

    return (
      <div className="Appointment-app">
        <div className="app-card">
          <div className="top-section">
            <form className="text-container" onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>

              <input
                id="title"
                type="text"
                placeholder="Title"
                className="input"
                value={inputName}
                onChange={this.onChangeNameInput}
              />

              <label className="label" htmlFor="date">
                DATE
              </label>

              <input
                id="date"
                type="date"
                placeholder="Date"
                className="input"
                value={inputDate}
                onChange={this.onChangeDateInput}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="hr" />
          <div className="bottom-section">
            <div className="heading-section">
              <h1 className="heading">Appointments</h1>
              <button
                type="button"
                className={`button ${filterClassName}`}
                onClick={this.onFilterActive}
              >
                Starred
              </button>
            </div>
            <ul className="lists">
              {FilteredAppointments.map(eachAppointment => (
                <AppointmentItem
                  onToggledStar={this.onToggledStar}
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
