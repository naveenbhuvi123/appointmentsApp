import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggledStar} = props
  const {id, name, date, isStarred} = appointmentDetails

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickstar = () => {
    onToggledStar(id)
  }
  return (
    <li className="list-container">
      <div className="top-container">
        <h1 className="appointment-heading">{name}</h1>
        <button
          type="button"
          className="star"
          data-testid="star"
          onClick={onClickstar}
        >
          <img src={starImg} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}
export default AppointmentItem
